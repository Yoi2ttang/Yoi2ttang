package com.ssafy.yoittangapp.module

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.ssafy.yoittangapp.service.ForegroundService

class ForegroundModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), PermissionListener {

    companion object {
        private const val REQUEST_PERMISSIONS_CODE = 12345
        private val REQUIRED_PERMISSIONS = arrayOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            // Android 13+
            Manifest.permission.FOREGROUND_SERVICE_LOCATION
        )
    }

    override fun getName() = "Foreground"

    @ReactMethod
    fun startService() {
        val activity = currentActivity

        // 1) 누락된 권한 검사
        val missing = REQUIRED_PERMISSIONS.filter {
            ContextCompat.checkSelfPermission(reactContext, it) != PackageManager.PERMISSION_GRANTED
        }.toTypedArray()

        if (missing.isNotEmpty() && activity != null) {
            // 2) PermissionAwareActivity 인터페이스로 요청
            if (activity is PermissionAwareActivity) {
                activity.requestPermissions(missing, REQUEST_PERMISSIONS_CODE, this)
            } else {
                // 일반 액티비티인 경우
                ActivityCompat.requestPermissions(activity, missing, REQUEST_PERMISSIONS_CODE)
            }
        } else {
            // 권한 이미 모두 허용된 경우
            startServiceInternal()
        }
    }

    private fun startServiceInternal() {
        val ctx: Context = reactContext
        val intent = Intent(ctx, ForegroundService::class.java)
        ContextCompat.startForegroundService(ctx, intent)
    }

    @ReactMethod
    fun stopService() {
        val ctx: Context = reactContext
        val intent = Intent(ctx, ForegroundService::class.java)
        ctx.stopService(intent)
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ): Boolean {
        if (requestCode == REQUEST_PERMISSIONS_CODE) {
            val allGranted = grantResults.all { it == PackageManager.PERMISSION_GRANTED }
            if (allGranted) {
                startServiceInternal()
            } else {
                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("foregroundPermissionDenied", null)
            }
            return true
        }
        return false
    }
}
