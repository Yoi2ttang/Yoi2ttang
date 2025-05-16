package com.ssafy.yoittangWatch.application.running

import android.Manifest
import android.app.Notification
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.IBinder
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import androidx.health.services.client.ExerciseClient
import androidx.health.services.client.ExerciseUpdateCallback
import androidx.health.services.client.HealthServices
import androidx.health.services.client.data.Availability
import androidx.health.services.client.data.BatchingMode
import androidx.health.services.client.data.CumulativeDataPoint
import androidx.health.services.client.data.DataPointContainer
import androidx.health.services.client.data.DataType
import androidx.health.services.client.data.ExerciseCapabilities
import androidx.health.services.client.data.ExerciseConfig
import androidx.health.services.client.data.ExerciseEventType
import androidx.health.services.client.data.ExerciseLapSummary
import androidx.health.services.client.data.ExerciseType
import androidx.health.services.client.data.ExerciseUpdate
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import com.google.common.util.concurrent.FutureCallback
import com.google.common.util.concurrent.Futures
import com.ssafy.yoittangWatch.R
import com.ssafy.yoittangWatch.presentation.common.PhoneNode
import com.ssafy.yoittangWatch.presentation.main.MainActivity
import com.ssafy.yoittangWatch.presentation.running.RunningActivity.CalorieHolder
import com.ssafy.yoittangWatch.presentation.running.RunningActivity.DistanceHolder
import com.ssafy.yoittangWatch.presentation.running.RunningActivity.HeartRateHolder
import com.ssafy.yoittangWatch.presentation.running.RunningActivity.SpeedHolder
import org.json.JSONObject

class RunningForegroundService : Service() {
    private val TAG = "RunningForegroundService"

    companion object {
        const val ACTION_START = "com.ssafy.yoittangWatch.action.START"
        const val ACTION_STOP  = "com.ssafy.yoittangWatch.action.STOP"
        private const val NOTIF_ID = 1001
    }

    private lateinit var exerciseClient: ExerciseClient
    private var updateCallback: ExerciseUpdateCallback? = null
    private lateinit var wakeLock: PowerManager.WakeLock

    private val messageListener = MessageClient.OnMessageReceivedListener { event ->
        if (event.path == "/running/stop") {
            Log.d(TAG, "Received STOP message")
            handleStop()
        }
    }

    override fun onCreate() {
        super.onCreate()
        val pm = getSystemService(Context.POWER_SERVICE) as PowerManager
        wakeLock = pm.newWakeLock(
            PowerManager.PARTIAL_WAKE_LOCK or PowerManager.ON_AFTER_RELEASE,
            "$TAG::WakeLock"
        ).apply {
            acquire(/* timeoutMs = */ 0L)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        if (wakeLock.isHeld) wakeLock.release()
        Wearable.getMessageClient(this).removeListener(messageListener)
        stopExerciseSession()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START -> {
                Log.d(TAG, "ACTION_START received")
                startForeground(NOTIF_ID, buildNotification())
                // 세션 초기화 및 업데이트 콜백 등록
                initializeExerciseSession()
                Wearable.getMessageClient(this).addListener(messageListener)
            }

            ACTION_STOP -> {
                Log.d(TAG, "ACTION_STOP received")
                handleStop()
            }

            else -> {
                Log.w(TAG, "Unknown action: ${intent?.action}")
            }
        }
        // 서비스가 시스템에 의해 kill 되어도 재시작
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    // 1) 초기 진입: ExerciseClient 초기화 + 데이터 타입 조회 요청
    private fun initializeExerciseSession() {
        exerciseClient = HealthServices.getClient(this).exerciseClient
        fetchSupportedDataTypes()
    }

    // 2) 기기가 지원하는 데이터 타입을 가져오는 단계
    private fun fetchSupportedDataTypes() {
        val capsFuture = exerciseClient.getCapabilitiesAsync()
        Futures.addCallback(capsFuture, object : FutureCallback<ExerciseCapabilities> {
            override fun onSuccess(caps: ExerciseCapabilities?) {
                if (caps == null) {
                    Log.e(TAG, "Capability 가 null 입니다")
                    return
                }
                onCapabilitiesReceived(caps)
            }
            override fun onFailure(t: Throwable) {
                Log.e(TAG, "Capability 조회 실패", t)
            }
        }, mainExecutor)
    }

    private fun onCapabilitiesReceived(caps: ExerciseCapabilities) {
        val runningCaps = caps.getExerciseTypeCapabilities(ExerciseType.RUNNING)
        val supported = runningCaps.supportedDataTypes

        val desired = setOf(
            DataType.HEART_RATE_BPM,
            DataType.DISTANCE,
            DataType.SPEED,
            DataType.CALORIES_TOTAL,
            DataType.PACE
        )
        val toRequest = desired.intersect(supported)
        Log.d(TAG, "RUNNING supports: $toRequest")

        startExerciseSession(toRequest)
    }

    // 3) 운동 세션 시작 + 콜백 등록
    private fun startExerciseSession(toRequest: Set<DataType<*, *>>) {
        val config = ExerciseConfig.Builder(ExerciseType.RUNNING)
            .setDataTypes(toRequest)
            .setIsAutoPauseAndResumeEnabled(false)
            .setIsGpsEnabled(true)
            .setBatchingModeOverrides(
                setOf(BatchingMode.HEART_RATE_5_SECONDS)
            )
            .build()

        val startFuture = exerciseClient.startExerciseAsync(config)
        Futures.addCallback(startFuture, object : FutureCallback<Void> {
            override fun onSuccess(result: Void?) {
                Log.d(TAG, "✅ 운동 세션 시작 성공")
                registerUpdates()   // 기존 콜백 등록
            }
            override fun onFailure(t: Throwable) {
                Log.e(TAG, "❌ 운동 세션 시작 실패", t)
            }
        }, mainExecutor)
    }

    private fun buildNotification(): Notification {
        val pi = PendingIntent.getActivity(
            this, 0,
            Intent(this, MainActivity::class.java)
                .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP),
            PendingIntent.FLAG_IMMUTABLE
        )

        return NotificationCompat.Builder(this, getString(R.string.notification_channel_id_running))
            .setContentTitle("요이땅 러닝 중")
            .setContentText("운동 기록을 수집하고 있습니다")
            .setSmallIcon(R.drawable.ic_logo)
            .setContentIntent(pi)
            .build()
    }

    private fun stopExerciseSession() {
        // 운동 세션 종료
        val endFuture = exerciseClient.endExerciseAsync()

        Futures.addCallback(
            endFuture,
            object : FutureCallback<Void> {
                override fun onSuccess(result: Void?) {
                    // updateCallback 이 null 이 아닐 때만 clearUpdateCallbackAsync 호출
                    updateCallback?.let { cb ->
                        val clearFuture = exerciseClient.clearUpdateCallbackAsync(cb)
                        Futures.addCallback(
                            clearFuture,
                            object : FutureCallback<Void> {
                                override fun onSuccess(r: Void?) {
                                    Log.d(TAG, "✅ 업데이트 콜백 해제 완료")
                                    // 혹시 재시작 시를 대비해 콜백 변수도 null 처리
                                    updateCallback = null
                                }

                                override fun onFailure(t: Throwable) {
                                    Log.e(TAG, "❌ 콜백 해제 실패", t)
                                }
                            },
                            mainExecutor
                        )
                    } ?: run {
                        // updateCallback 이 아직 초기화되지 않았을 때
                        Log.w(TAG, "⚠️ 업데이트 콜백이 없습니다.")
                    }
                }

                override fun onFailure(t: Throwable) {
                    Log.e(TAG, "❌ 운동 세션 종료 실패", t)
                }
            },
            mainExecutor
        )
    }

    private fun registerUpdates() {
        // 6) 업데이트 콜백 등록 (센서 권한 확인 후)
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.BODY_SENSORS)
            != PackageManager.PERMISSION_GRANTED
        ) return


        val cb = object : ExerciseUpdateCallback {
            override fun onAvailabilityChanged(
                dataType: DataType<*, *>,
                availability: Availability
            ) {
            }

            override fun onExerciseUpdateReceived(update: ExerciseUpdate) {
                val metrics = update.latestMetrics
                updateHeartRate(metrics)
                updateDistance(metrics)
                updateSpeed(metrics)
                updateCalorie(metrics)

                // ① 전송할 데이터를 Map으로 수집
                val dataMap = mutableMapOf<String, Any>()
                HeartRateHolder.bpm.value?.let { dataMap["heartRate"] = it }
                DistanceHolder.distance.value?.let { dataMap["distance"] = it }
                SpeedHolder.speed.value?.let { dataMap["speed"] = it }
                CalorieHolder.calorie.value?.let { dataMap["calorie"] = it }

                // ② 스마트폰으로 전송
                sendMetricsToPhone(dataMap)
            }

            override fun onLapSummaryReceived(lapSummary: ExerciseLapSummary) {}
            override fun onRegistered() {}
            override fun onRegistrationFailed(throwable: Throwable) {}
        }

        updateCallback = cb
        exerciseClient.setUpdateCallback(mainExecutor, cb)
    }

    // 메시지 수신 STOP 처리 공통
    private fun handleStop() {
        Wearable.getMessageClient(this).removeListener(messageListener)
        stopExerciseSession()
        stopForeground(true)
        stopSelf()
        // MainActivity 띄우기
        startActivity(Intent(this, MainActivity::class.java)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP))
    }

    private fun sendMetricsToPhone(metricsMap: Map<String, Any>) {
        PhoneNode.phoneNodeId?.let { nodeId ->
            val json = JSONObject(metricsMap).toString()
            Wearable.getMessageClient(this)
                .sendMessage(nodeId, "/running/metrics", json.toByteArray())
                .addOnSuccessListener {
                    Log.d(TAG, "Metrics 전송 성공: $json")
                }
                .addOnFailureListener { e ->
                    Log.e(TAG, "Metrics 전송 실패", e)
                }
        }
    }

    private fun updateHeartRate(metrics: DataPointContainer) {
        val latestBpm = metrics.getData(DataType.HEART_RATE_BPM)
            .lastOrNull()
            ?.value
            ?.toInt()

        // null이 아닐 때만 업데이트
        if (latestBpm != null) {
            HeartRateHolder.update(latestBpm)
        }
    }

    private fun updateDistance(metrics: DataPointContainer) {
        val distance = metrics.getData(DataType.DISTANCE)
            .lastOrNull()
            ?.value
            ?.toInt()

        if (distance != null) {
            DistanceHolder.update(distance)
        }
    }

    private fun updateSpeed(metrics: DataPointContainer) {
        val speed = metrics.getData(DataType.SPEED)
            .lastOrNull()
            ?.value
            ?.toFloat()
        if (speed != null) {
            SpeedHolder.update(speed)
        }
    }

    private fun updateCalorie(metrics: DataPointContainer) {
        val calorie = metrics.getData(DataType.CALORIES_TOTAL)
            ?.let { it as? CumulativeDataPoint<Double> }
            ?.total
            ?.toFloat()

        if (calorie != null) {
            CalorieHolder.update(calorie)
        }
    }
}
