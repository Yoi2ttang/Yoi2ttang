package com.ssafy.yoittangapp.presentation.common.util

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.provider.Settings
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.core.content.ContextCompat
import com.ssafy.yoittangapp.R

object PermissionHelper {

    private val fgPermissions = arrayOf(
        Manifest.permission.BODY_SENSORS,
        Manifest.permission.ACTIVITY_RECOGNITION,
        Manifest.permission.ACCESS_COARSE_LOCATION,
        Manifest.permission.ACCESS_FINE_LOCATION
    )
    private val bgPermissions = listOf(
        Manifest.permission.ACCESS_BACKGROUND_LOCATION,
        Manifest.permission.BODY_SENSORS_BACKGROUND
    )

    private lateinit var activity: ComponentActivity
    private lateinit var fgLauncher: ActivityResultLauncher<Array<String>>
    private val bgLaunchers = mutableMapOf<String, ActivityResultLauncher<String>>()

    /** 1) onCreate에서 한 번만 호출해서 런처 등록 */
    fun registerLaunchers(
        activity: ComponentActivity
    ) {
        this.activity = activity

        // Foreground 권한 묶음 런처
        fgLauncher = activity.registerForActivityResult(
            ActivityResultContracts.RequestMultiplePermissions()
        ) { results ->
            val allGranted = fgPermissions.all { perm -> results[perm] == true }
            if (!allGranted) {
                AlertDialog.Builder(activity)
                    .setTitle(R.string.alert_dialog_title_permission)
                    .setMessage(R.string.alert_dialog_message_permission)
                    .setPositiveButton(R.string.alert_dialog_button_positive_permission) { _, _ ->
                        // 앱 설정으로 이동
                        activity.startActivity(
                            Intent(
                                Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                                Uri.fromParts("package", activity.packageName, null)
                            )
                        )
                    }
                    .setNegativeButton(R.string.alert_dialog_button_negative_permission, null)
                    .show()
                return@registerForActivityResult
            }
            // Foreground 모두 허용 → Background 로 넘어감
            requestBackgroundPermissions()
        }

        // Background 권한 개별 런처
        bgPermissions.forEach { perm ->
            bgLaunchers[perm] = activity.registerForActivityResult(
                ActivityResultContracts.RequestPermission()
            ) { granted ->
                if (!granted) {
                    AlertDialog.Builder(activity)
                        .setTitle(R.string.alert_dialog_title_additional_permission)
                        .setMessage(R.string.alert_dialog_message_additional_permission)
                        .setPositiveButton(R.string.alert_dialog_button_positive_permission) { _, _ ->
                            // 설정 화면으로
                            activity.startActivity(
                                Intent(
                                    Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                                    Uri.fromParts("package", activity.packageName, null)
                                )
                            )
                        }
                        .setNegativeButton(R.string.alert_dialog_button_negative_permission, null)
                        .show()
                }
                // 배경 권한까지 모두 허용됐으면 토스트 + 후속 콜백
                if (allPermissionsGranted()) {
                    Toast.makeText(activity, "권한이 모두 허용되었습니다", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    /** 2) 실제 권한 체크 & 요청 시작 */
    fun ensurePermissions() {
        // Foreground 먼저
        val missingFg = fgPermissions.filter {
            ContextCompat.checkSelfPermission(activity, it) != PackageManager.PERMISSION_GRANTED
        }
        if (missingFg.isNotEmpty()) {
            fgLauncher.launch(missingFg.toTypedArray())
            return
        }
        // Background 요청
        requestBackgroundPermissions()
    }

    /** Foreground 허용 후, Background 요청 */
    private fun requestBackgroundPermissions() {
        val missingBg = bgPermissions.filter {
            ContextCompat.checkSelfPermission(activity, it) != PackageManager.PERMISSION_GRANTED
        }
        if (missingBg.isNotEmpty()) {
            bgLaunchers[missingBg.first()]?.launch(missingBg.first())
        }
    }

    /** 전체 권한 허용 상태 확인 */
    fun allPermissionsGranted(): Boolean {
        val fgOk = fgPermissions.all {
            ContextCompat.checkSelfPermission(activity, it) == PackageManager.PERMISSION_GRANTED
        }
        val bgOk = bgPermissions.all {
            ContextCompat.checkSelfPermission(activity, it) == PackageManager.PERMISSION_GRANTED
        }
        return fgOk && bgOk
    }
}
