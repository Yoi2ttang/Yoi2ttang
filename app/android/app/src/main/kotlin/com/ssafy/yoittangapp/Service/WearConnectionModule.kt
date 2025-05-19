package com.ssafy.yoittangapp.Service

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.android.gms.wearable.Wearable

class WearConnectionModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WearConnectionModule"
    }

    @ReactMethod
    fun getConnectedNode(promise: Promise) {
        try {
            val client = Wearable.getNodeClient(reactApplicationContext)
            client.connectedNodes.addOnSuccessListener { nodes ->
                if (nodes.isNotEmpty()) {
                    
                    // todo. LocationForegroundService 시작
                    
                    val id = nodes.first().id
                    promise.resolve(id)
                } else {
                    promise.reject("NO_NODE", "No connected nodes found.")
                }
            }.addOnFailureListener {
                promise.reject("NODE_FETCH_ERROR", it.message, it)
            }
        } catch (e: Exception) {
            promise.reject("EXCEPTION", e.message, e)
        }
    }
}
