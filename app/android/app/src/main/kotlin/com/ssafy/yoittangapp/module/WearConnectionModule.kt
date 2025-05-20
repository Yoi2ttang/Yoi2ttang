package com.ssafy.yoittangapp.module

import android.content.Intent
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.android.gms.wearable.Wearable
import com.ssafy.yoittangapp.service.ForegroundService

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

                    val intent = Intent(reactApplicationContext, ForegroundService::class.java)
                    ContextCompat.startForegroundService(reactApplicationContext, intent)
                    
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
