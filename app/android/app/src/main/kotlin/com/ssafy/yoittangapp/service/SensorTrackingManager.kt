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
        Log.d(TAG, "▷ 메시지 수신 시도: path=${event.path}, size=${event.data.size}")
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
                    "lat" to lat,
                    "lng" to lng
                )

                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("metricsFromWatch", map)

            } catch (e: Exception) {
                Log.e(TAG, "JSON 파싱 실패", e)
            }
        } else {
            Log.w(TAG, "예상치 못한 메시지 수신: path=${event.path}, data=${String(event.data)}")
        }
    }

    fun start() {
        Log.d(TAG, "▶ Listener 등록 시도")
        // 연결된 노드 찍어보기
        Wearable.getNodeClient(context).connectedNodes
            .addOnSuccessListener { nodes ->
                Log.d(TAG, "▶ 연결된 노드 개수=${nodes.size}, nodes=$nodes")
            }

        // 메시지 리스너 등록
        Wearable.getMessageClient(context).addListener(messageListener)
        Log.d(TAG, "▶ Listener 등록 완료")
    }

    fun stop() {
        Log.d(TAG, "SensorTrackingManager stopped (워치 수신 리스너 해제)")
        Wearable.getMessageClient(context).removeListener(messageListener)
    }
}
