package com.ssafy.yoittangWatch.presentation.running

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Stop
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import androidx.health.services.client.HealthServices
import androidx.health.services.client.ExerciseClient
import androidx.health.services.client.ExerciseUpdateCallback
import androidx.health.services.client.data.Availability
import androidx.health.services.client.data.CumulativeDataPoint
import androidx.health.services.client.data.DataPointContainer
import androidx.health.services.client.data.DataType
import androidx.health.services.client.data.ExerciseCapabilities
import androidx.health.services.client.data.ExerciseConfig
import androidx.health.services.client.data.ExerciseLapSummary
import androidx.health.services.client.data.ExerciseType
import androidx.health.services.client.data.ExerciseUpdate
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import com.google.common.util.concurrent.FutureCallback
import com.google.common.util.concurrent.Futures
import com.ssafy.yoittangWatch.presentation.common.PhoneNode
import com.ssafy.yoittangWatch.presentation.common.YoittangCircleButton
import com.ssafy.yoittangWatch.presentation.common.util.formatElapsedTime
import com.ssafy.yoittangWatch.presentation.common.util.getCurrentTimeString
import com.ssafy.yoittangWatch.presentation.main.MainActivity
import com.ssafy.yoittangWatch.presentation.theme.YoittangWatchTheme
import kotlinx.coroutines.delay
import org.json.JSONObject

class RunningActivity : ComponentActivity() {

    private val TAG = "RunningActivity"
    private lateinit var exerciseClient: ExerciseClient

    private val messageListener = MessageClient.OnMessageReceivedListener { messageEvent ->
        when (messageEvent.path) {
            "/running/stop" -> {
                Log.d(TAG, "Received stop message")
                navigateToMain(this)
            }
        }
    }

    object HeartRateHolder {
        private val _bpm = mutableStateOf<Int?>(null)
        val bpm: State<Int?> = _bpm
        fun update(value: Int?) { _bpm.value = value }
    }

    object DistanceHolder {
        private val _distance = mutableStateOf<Int?>(null)
        val distance: State<Int?> = _distance
        fun update(value: Int?) { _distance.value = value }
    }

    object SpeedHolder {
        private val _speed = mutableStateOf<Float?>(null)
        val speed: State<Float?> = _speed
        fun update(value: Float?) { _speed.value = value }
    }

    object CalorieHolder {
        private val _calorie = mutableStateOf<Float?>(null)
        val calorie: State<Float?> = _calorie
        fun update(value: Float?) { _calorie.value = value }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { YoittangWatchTheme { RunningScreen() } }
        initializeExerciseSession()
    }

    override fun onResume() {
        super.onResume()
        Wearable.getMessageClient(this).addListener(messageListener)
    }

    override fun onPause() {
        super.onPause()
        Wearable.getMessageClient(this).removeListener(messageListener)
    }

    private fun initializeExerciseSession() {
        exerciseClient = HealthServices.getClient(this).exerciseClient

        // 1) 기기에서 RUNNING 운동 지원 데이터 타입 조회
        val capsFuture = exerciseClient.getCapabilitiesAsync()
        Futures.addCallback(
            capsFuture,
            object : FutureCallback<ExerciseCapabilities> {
                override fun onSuccess(caps: ExerciseCapabilities?) {
                    caps?.let {
                        val runningCaps = it.getExerciseTypeCapabilities(ExerciseType.RUNNING)
                        val supported = runningCaps.supportedDataTypes

                        // 2) 요청하고 싶은 타입 목록
                        val desired = setOf(
                            DataType.HEART_RATE_BPM,
                            DataType.DISTANCE,
                            DataType.SPEED,
                            DataType.CALORIES_TOTAL,
                            DataType.PACE
                        )

                        // 3) 지원되는 타입만 필터링
                        val toRequest = desired.intersect(supported)
                        Log.d(TAG, "RUNNING supports: $toRequest")

                        // 4) 필터된 타입으로 운동 시작 구성
                        val config = ExerciseConfig.Builder(ExerciseType.RUNNING)
                            .setDataTypes(toRequest)
                            .build()

                        // 5) 운동 세션 시작
                        val startFuture = exerciseClient.startExerciseAsync(config)
                        Futures.addCallback(
                            startFuture,
                            object : FutureCallback<Void> {
                                override fun onSuccess(result: Void?) {
                                    Log.d(TAG, "✅ 운동 세션 시작 성공")
                                    registerUpdates()
                                }
                                override fun onFailure(t: Throwable) {
                                    Log.e(TAG, "❌ 운동 세션 시작 실패", t)
                                }
                            },
                            mainExecutor
                        )
                    }
                }
                override fun onFailure(t: Throwable) {
                    Log.e(TAG, "캡빌리티 조회 실패", t)
                }
            },
            mainExecutor
        )
    }

    private fun registerUpdates() {
        // 6) 업데이트 콜백 등록 (센서 권한 확인 후)
        if (ContextCompat.checkSelfPermission(
                this, Manifest.permission.BODY_SENSORS
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            exerciseClient.setUpdateCallback(
                mainExecutor,
                object : ExerciseUpdateCallback {
                    override fun onAvailabilityChanged(
                        dataType: DataType<*, *>,
                        availability: Availability
                    ) { /* 생략 */ }

                    override fun onExerciseUpdateReceived(update: ExerciseUpdate) {
                        val metrics = update.latestMetrics
                        updateHeartRate(metrics)
                        updateDistance(metrics)
                        updateSpeed(metrics)
                        updateCalorie(metrics)

                        // ① 전송할 데이터를 Map으로 수집
                        val dataMap = mutableMapOf<String, Any>()
                        HeartRateHolder.bpm.value?.let    { dataMap["heartRate"] = it }
                        DistanceHolder.distance.value?.let{ dataMap["distance"]  = it }
                        SpeedHolder.speed.value?.let      { dataMap["speed"]     = it }
                        CalorieHolder.calorie.value?.let  { dataMap["calorie"]   = it }

                        // ② 스마트폰으로 전송
                        sendMetricsToPhone(dataMap)
                    }

                    override fun onLapSummaryReceived(lapSummary: ExerciseLapSummary) {}
                    override fun onRegistered() {}
                    override fun onRegistrationFailed(throwable: Throwable) {}
                }
            )
        }
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

//    private fun sendMetricsToPhone(metricsMap: Map<String, Any>) {
//        val json = JSONObject(metricsMap).toString()
//        val nodeId = PhoneNode.phoneNodeId
//
//        // nodeId 상태 로깅
//        Log.d(TAG, "sendMetricsToPhone() nodeId: $nodeId, payload: $json")
//
//        if (nodeId.isNullOrEmpty()) {
//            // null 또는 빈 값일 때에도 로그로 남김
//            Log.w(TAG, "Metrics 전송 skipped – phoneNodeId is null or empty")
//        } else {
//            Wearable.getMessageClient(this)
//                .sendMessage(nodeId, "/running/metrics", json.toByteArray())
//                .addOnSuccessListener {
//                    Log.d(TAG, "Metrics 전송 성공: $json")
//                }
//                .addOnFailureListener { e ->
//                    Log.e(TAG, "Metrics 전송 실패", e)
//                }
//        }
//    }

    private fun updateHeartRate(metrics: DataPointContainer) {
        val bpm = metrics.getData(DataType.HEART_RATE_BPM)
            .lastOrNull()
            ?.value
            ?.toInt()
        HeartRateHolder.update(bpm)
    }

    private fun updateDistance(metrics: DataPointContainer) {
        val distance = metrics.getData(DataType.DISTANCE)
            .lastOrNull()
            ?.value
            ?.toInt()
        DistanceHolder.update(distance)
    }

    private fun updateSpeed(metrics: DataPointContainer) {
        val speed = metrics.getData(DataType.SPEED)
            .lastOrNull()
            ?.value
            ?.toFloat()
        SpeedHolder.update(speed)
    }

    private fun updateCalorie(metrics: DataPointContainer) {
        val calorie = metrics.getData(DataType.CALORIES_TOTAL)
            ?.let { it as? CumulativeDataPoint<Double> }
            ?.total
            ?.toFloat()
        CalorieHolder.update(calorie)
    }

    private fun navigateToMain(activity: Activity) {
        val intent = Intent(activity, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
        }
        activity.startActivity(intent)
    }

    private fun sendStopSignalToPhone(context: Context, nodeId: String) {
        val messageClient = Wearable.getMessageClient(context)
        messageClient.sendMessage(
            nodeId,
            "/running/stop",   // 스마트폰 앱에서 이 path를 수신 리스너에 등록해야 함
            ByteArray(0)
        ).addOnSuccessListener {
            Log.d("YoittangWatch", "러닝 종료 메시지 전송 완료")
        }.addOnFailureListener { e ->
            Toast.makeText(context, "러닝 종료 메시지 전송 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    fun stopRunning(context: Context, activity: Activity) {
        PhoneNode.phoneNodeId?.let { nodeId ->
            sendStopSignalToPhone(this, nodeId)
        }
        navigateToMain(activity)
    }
}

@Composable
fun RunningScreen() {
    // 현재 시간 상태
    val currentTime = remember { mutableStateOf(getCurrentTimeString()) }
    val elapsedSeconds = remember { mutableStateOf(0) }
    val context = LocalContext.current
    val activity = context as? Activity

    // 1초마다 시간 갱신
    LaunchedEffect(Unit) {
        while (true) {
            currentTime.value = getCurrentTimeString()
            elapsedSeconds.value ++
            delay(1000)
        }
    }

    Box(
        modifier = Modifier.fillMaxSize().padding(8.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier.align(Alignment.TopCenter).offset(y=20.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(text = currentTime.value, style = MaterialTheme.typography.body1)
            val distance = RunningActivity.DistanceHolder.distance.value ?: 0
            Text(text = "${"%.2f".format(distance/1000f)} km", style = MaterialTheme.typography.display1)
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                Text(text = "0'00", style = MaterialTheme.typography.body1)
                Text(text = formatElapsedTime(elapsedSeconds.value), style = MaterialTheme.typography.body1)
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(text = "❤️", fontSize = 16.sp)
                Spacer(modifier = Modifier.width(4.dp))
                Text(text = RunningActivity.HeartRateHolder.bpm.value?.toString() ?: "-", style = MaterialTheme.typography.body1)
            }
        }
        YoittangCircleButton(
            icon = Icons.Filled.Stop,
            contentDescription = "러닝 종료",
            onClick = {
                (activity as? RunningActivity)?.stopRunning(context, activity)
            },
            modifier = Modifier.align(Alignment.BottomCenter).offset(y = 160.dp),
            iconOffsetY = (-75).dp
        )
    }
}
