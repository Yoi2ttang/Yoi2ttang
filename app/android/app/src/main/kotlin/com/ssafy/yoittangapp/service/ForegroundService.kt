package com.ssafy.yoittangapp.service

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactApplicationContext
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import com.ssafy.yoittangapp.R

class ForegroundService : Service() {

    companion object {
        const val CHANNEL_ID = "yoittang_location_channel"
        const val NOTIFICATION_ID = 1001
    }

    private lateinit var sensorTrackingManager: SensorTrackingManager

    // MessageClient(워치로부터 신호를 받는 리스너)에는 하나의 리스너만 등록 가능
    private val messageListener = MessageClient.OnMessageReceivedListener { messageEvent ->
        when (messageEvent.path) {
            "/run/start" -> {
                Log.d("ForegroundService", "워치로부터 러닝 시작 신호 수신")
                // TODO: 센서 시작 or JS로 전달
            }

            "/run/stop" -> {
                Log.d("ForegroundService", "워치로부터 러닝 종료 신호 수신")
                // TODO: JS에 csvReady 이벤트 전송
            }
        }
    }

    // BroadcastReceiver는 여러 개 등록 가능
    private val startReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == "com.ssafy.START_RUNNING") {
                Log.d("ForegroundService", "JS에서 러닝 시작 요청")
                registerReceiver(
                    stopReceiver,
                    IntentFilter("com.ssafy.STOP_RUNNING"),
                    RECEIVER_NOT_EXPORTED
                )// 러닝 종료 신호 Listener
                
                // 센서 시작 + csv 작성 시작
            }
        }
    }
    
    private val stopReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == "com.ssafy.START_STOP") {
                Log.d("ForegroundService", "JS에서 러닝 종료 요청")
                // 센서 종료, csv 작성 종료
            }
        }
    }

    override fun onCreate() {
        super.onCreate()
        Log.d("LocationService", "Foreground Service Created")
        createNotificationChannel()

        Wearable.getMessageClient(this).addListener(messageListener)    // 워치 신호 Listener 등록
        registerReceiver(
            startReceiver,
            IntentFilter("com.ssafy.START_RUNNING"),
            // 앱 내부 통신 전용
            RECEIVER_NOT_EXPORTED
        )                                                                       // JS 시작 신호 Listener

        // 워치로부터 데이터를 받는 manager start
        val reactApp = application as? ReactApplication
        val reactContext = reactApp?.reactNativeHost
            ?.reactInstanceManager
            ?.currentReactContext as? ReactApplicationContext

        if (reactContext != null) {
            sensorTrackingManager = SensorTrackingManager(this, reactContext)
            sensorTrackingManager.start()
        } else {
            Log.w("LocationService", "⚠️ ReactApplicationContext is null.")
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("LocationService", "Foreground Service Started")

        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(getString(R.string.notification_channel_id_running))
            .setContentText("워치에서 위치를 수신 중입니다")
            .setSmallIcon(R.drawable.ic_logo)
            .setOngoing(true)
            .build()

        startForeground(NOTIFICATION_ID, notification)

        // TODO: 워치로부터 메시지 수신 로직 등록
        // 예: MessageClient.addListener(...)
        // 이후 받은 메시지를 JS로 전달하거나 저장

        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("LocationService", "Foreground Service Destroyed")

        Wearable.getMessageClient(this).removeListener(messageListener)
        unregisterReceiver(startReceiver)
        unregisterReceiver(stopReceiver)
        sensorTrackingManager.stop()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun createNotificationChannel() {
        val serviceChannel = NotificationChannel(
            CHANNEL_ID,
            getString(R.string.notification_channel_id_running),
            NotificationManager.IMPORTANCE_LOW
        )
        val manager = getSystemService(NotificationManager::class.java)
        manager?.createNotificationChannel(serviceChannel)
    }
}
