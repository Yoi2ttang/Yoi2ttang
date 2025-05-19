package com.ssafy.yoittangapp.service

import android.content.Context
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import com.ssafy.yoittangapp.utils.CsvLogger
import org.json.JSONObject

class SensorTrackingManager(
    private val context: Context,
    private val reactContext: ReactApplicationContext
) {
    private val TAG = "SensorTrackingManager"
    private val csvLogger = CsvLogger(context)

    private val messageListener = MessageClient.OnMessageReceivedListener { event ->
        if (event.path == "/running/metrics") {
            val json = String(event.data)
            Log.d(TAG, "워치로부터 메트릭 수신: $json")

            // JSON 파싱 및 JS 전달
            try {
                val obj = JSONObject(json)
                val heartRate = obj.optInt("heartRate")
                val distance = obj.optDouble("distance")
                val lat = obj.optDouble("lat")
                val lng = obj.optDouble("lng")

                Log.d(TAG, "received data: heartRate=$heartRate, distance=$distance, lat=$lat, lng=$lng")
                csvLogger.log(lat, lng)

                val map = mapOf(
                    "heartRate" to heartRate,
                    "distance" to distance,
                )

                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("metricsFromWatch", map)

            } catch (e: Exception) {
                Log.e(TAG, "JSON 파싱 실패", e)
            }
        }
    }

    fun start() {
        Log.d(TAG, "SensorTrackingManager started (워치 수신 리스너 등록)")
        Wearable.getMessageClient(context).addListener(messageListener)
    }

    fun stop() {
        Log.d(TAG, "SensorTrackingManager stopped (워치 수신 리스너 해제)")
        Wearable.getMessageClient(context).removeListener(messageListener)
    }
}
