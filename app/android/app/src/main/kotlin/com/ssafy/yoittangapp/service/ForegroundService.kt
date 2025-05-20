package com.ssafy.yoittangapp.service

import android.app.*
import android.content.*
import android.os.IBinder
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.wearable.Wearable
import com.ssafy.yoittangapp.R

class ForegroundService : Service() {

    companion object {
        private const val TAG = "ForegroundService"
        private const val CHANNEL_ID = "yoittang_location_channel"
        private const val NOTIFICATION_ID = 1001

        const val ACTION_FROM_WATCH_START = "ACTION_FROM_WATCH_START"
        const val ACTION_FROM_WATCH_STOP  = "ACTION_FROM_WATCH_STOP"
    }

    private lateinit var reactContext: ReactApplicationContext
    // private var sensorTrackingManager: SensorTrackingManager? = null   // ← 주석
    private var isStopReceiverRegistered = false

    /* -------------------------------------------------------------------- */
    /* JS → 안드로이드 브로드캐스트 리시버                                  */
    /* -------------------------------------------------------------------- */
    private val startFromReactReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == "com.ssafy.START_RUNNING") {
                Log.d(TAG, "JS 요청: 러닝 시작")
                registerStopReceiver()
                // sensorTrackingManager?.start()                     // ← 주석
                sendMessageToWatch("/running/start")
            }
        }
    }

    private val stopFromReactReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == "com.ssafy.STOP_RUNNING") {
                Log.d(TAG, "JS 요청: 러닝 종료")
                // sensorTrackingManager?.stop()                      // ← 주석
                sendMessageToWatch("/running/stop")
                wakeUpScreen()
            }
        }
    }

    /* -------------------------------------------------------------------- */
    /* 서비스 생명주기                                                      */
    /* -------------------------------------------------------------------- */
    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "Service Created")
        createNotificationChannel()

        // ReactContext 초기화 (SensorTrackingManager 제거됨)
        initReactContext()

        registerReceiver(
            startFromReactReceiver,
            IntentFilter("com.ssafy.START_RUNNING"),
            RECEIVER_NOT_EXPORTED
        )
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_FROM_WATCH_START -> handleWatchStart()
            ACTION_FROM_WATCH_STOP  -> handleWatchStop()
        }
        startForeground(NOTIFICATION_ID, buildNotification())
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "Service Destroyed")

        unregisterReceiver(startFromReactReceiver)
        if (isStopReceiverRegistered) unregisterReceiver(stopFromReactReceiver)
        // sensorTrackingManager?.stop()                              // ← 주석
    }

    override fun onBind(intent: Intent?): IBinder? = null

    /* -------------------------------------------------------------------- */
    /* ReactContext 초기화                                                  */
    /* -------------------------------------------------------------------- */
    private fun initReactContext() {
        val reactApp = application as? ReactApplication
        val irm = reactApp?.reactNativeHost?.reactInstanceManager

        irm?.addReactInstanceEventListener(
            object : ReactInstanceEventListener {
                override fun onReactContextInitialized(ctx: ReactContext) {
                    if (ctx is ReactApplicationContext) {
                        reactContext = ctx
                        // sensorTrackingManager =                    // ← 주석
                        //     SensorTrackingManager(this@ForegroundService, reactContext)
                        // Log.d(TAG, "SensorTrackingManager initialized")
                    }
                }
            }
        )
        if (irm != null && !irm.hasStartedCreatingInitialContext()) {
            irm.createReactContextInBackground()
        }
    }

    /* -------------------------------------------------------------------- */
    /* 워치 제어 신호                                                        */
    /* -------------------------------------------------------------------- */
    private fun registerStopReceiver() {
        if (!isStopReceiverRegistered) {
            registerReceiver(
                stopFromReactReceiver,
                IntentFilter("com.ssafy.STOP_RUNNING"),
                RECEIVER_NOT_EXPORTED
            )
            isStopReceiverRegistered = true
        }
    }

    private fun handleWatchStart() {
        Log.d(TAG, "워치 요청: START")
        // sensorTrackingManager?.start()                              // ← 주석
        sendControlEvent("runningStartedFromWatch")
    }

    private fun handleWatchStop() {
        Log.d(TAG, "워치 요청: STOP")
        // sensorTrackingManager?.stop()                               // ← 주석
        sendControlEvent("runningStoppedFromWatch")
        wakeUpScreen()
    }

    /* -------------------------------------------------------------------- */
    /* Util                                                                  */
    /* -------------------------------------------------------------------- */
    private fun buildNotification(): Notification = NotificationCompat.Builder(this, CHANNEL_ID)
        .setContentTitle(getString(R.string.notification_channel_id_running))
        .setContentText("워치에서 위치를 수신 중입니다")
        .setSmallIcon(R.drawable.ic_logo)
        .setOngoing(true)
        .build()

    private fun sendControlEvent(eventName: String) =
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, null)

    private fun sendMessageToWatch(path: String) =
        Wearable.getNodeClient(this).connectedNodes
            .addOnSuccessListener { nodes ->
                nodes.forEach { node ->
                    Log.d(TAG, "전송: $path to node=${node.id}")
                    Wearable.getMessageClient(this).sendMessage(node.id, path, ByteArray(0))
                }
            }

    private fun wakeUpScreen() {
        val pm = getSystemService(Context.POWER_SERVICE) as PowerManager
        pm.newWakeLock(
            PowerManager.PARTIAL_WAKE_LOCK or PowerManager.ACQUIRE_CAUSES_WAKEUP,
            "yoittang:RunWakeLock"
        ).apply { acquire(3000L) }
    }

    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            getString(R.string.notification_channel_id_running),
            NotificationManager.IMPORTANCE_LOW
        )
        getSystemService(NotificationManager::class.java)?.createNotificationChannel(channel)
    }
}
