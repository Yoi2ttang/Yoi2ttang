package com.ssafy.yoittangWatch.presentation.main

import android.Manifest
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.core.content.ContextCompat
import android.app.AlertDialog
import android.content.Context
import android.content.pm.PackageManager
import android.util.Log
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import com.ssafy.yoittangWatch.presentation.common.PhoneNode
import com.ssafy.yoittangWatch.presentation.common.YoittangCircleButton
import com.ssafy.yoittangWatch.presentation.countdown.CountdownActivity
import com.ssafy.yoittangWatch.presentation.theme.YoittangWatchTheme

class MainActivity : ComponentActivity() {

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

    private lateinit var fgLauncher: ActivityResultLauncher<Array<String>>
    private val bgLaunchers: MutableMap<String, ActivityResultLauncher<String>> = mutableMapOf()

    // 안드로이드 앱으로부터 러닝 시작 신호를 받으면 CountdownActivity로 이동
    private val messageListener = MessageClient.OnMessageReceivedListener { messageEvent ->
        when (messageEvent.path) {
            "/running/start" -> {
                Log.d("MainActivity", "Received start message")
                startCountdown()
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        initForegroundLauncher()
        initBackgroundLaunchers()

        fetchAndCachePhoneNode(this) {
            if(false) {
                closeAppWithPairingAlert()
            } else {
                fgLauncher.launch(fgPermissions)

                setContent {
                    YoittangWatchTheme {
                        MainScreen(onStartClick = { handleStartClick() })
                    }
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()
        Wearable.getMessageClient(this).addListener(messageListener)
    }

    override fun onPause() {
        super.onPause()
        Wearable.getMessageClient(this).removeListener(messageListener)
    }

    private fun closeAppWithPairingAlert() {
        AlertDialog.Builder(this)
            .setTitle("페어링된 기기 없음")
            .setMessage("페어링된 기기가 없습니다. 블루투스 또는 와이파이 연결을 확인하여 주십시오.")
            .setCancelable(false)
            .setPositiveButton("확인") { _, _ ->
                finishAffinity()
            }
            .show()
    }

    private fun initForegroundLauncher() {
        fgLauncher = registerForActivityResult(
            ActivityResultContracts.RequestMultiplePermissions()
        ) { results ->
            val allGranted = fgPermissions.all { perm -> results[perm] == true }
            if (!allGranted) {
                AlertDialog.Builder(this)
                    .setTitle("필수 권한 필요")
                    .setMessage("앱을 정상적으로 사용하려면 모든 권한을 허용하셔야 합니다.\n설정 화면으로 이동하시겠습니까?")
                    .setPositiveButton("설정으로 이동") { _, _ ->
                        startActivity(
                            Intent(
                                Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                                Uri.fromParts("package", packageName, null)
                            )
                        )
                    }
                    .setNegativeButton("취소", null)
                    .show()
                return@registerForActivityResult
            }

            val missingBg = bgPermissions.filter {
                ContextCompat.checkSelfPermission(this, it) != android.content.pm.PackageManager.PERMISSION_GRANTED
            }
            if (missingBg.isNotEmpty()) {
                AlertDialog.Builder(this)
                    .setTitle("추가 권한 필요")
                    .setMessage("러닝 중에도 위치를 기록하려면 백그라운드 위치 권한이 필요합니다.")
                    .setPositiveButton("설정으로 이동") { _, _ ->
                        startActivity(
                            Intent(
                                Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                                Uri.fromParts("package", packageName, null)
                            )
                        )
                    }
                    .setNegativeButton("취소", null)
                    .show()
            }
        }
    }

    private fun initBackgroundLaunchers() {
        bgPermissions.forEach { perm ->
            bgLaunchers[perm] = registerForActivityResult(
                ActivityResultContracts.RequestPermission()
            ) { granted ->
                if (granted) {
                    checkAndStartCountdown()
                } else {
                    Toast.makeText(
                        this,
                        "백그라운드 권한이 필요합니다: $perm",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }

    private fun handleStartClick() {
        // 1) 페어링 기기 체크
        // todo. 안드로이드 앱 연동 시 주석 제거
//        if (PhoneNode.phoneNodeId == null) {
//            closeAppWithPairingAlert()
//            return
//        }

        // 2) 권한 체크 및 요청
        val missingFg = fgPermissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }
        val missingBg = bgPermissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        when {
            missingFg.isNotEmpty() -> {
                fgLauncher.launch(missingFg.toTypedArray())
                return
            }
            missingBg.isNotEmpty() -> {
                val first = missingBg.first()
                bgLaunchers[first]?.launch(first)
                return
            }
            else -> {
                // 3) 모든 권한 OK, 카운트다운 시작
                startCountdown()
            }
        }

        // 4) 워치로 시작 신호 전송
        // todo. 안드로이드 앱 연동 시 주석 해제
        //sendStartSignalToPhone(this, PhoneNode.phoneNodeId!!)
    }

    private fun checkAndStartCountdown() {
        val allFg = fgPermissions.all {
            ContextCompat.checkSelfPermission(this, it) == android.content.pm.PackageManager.PERMISSION_GRANTED
        }
        val allBg = bgPermissions.all {
            ContextCompat.checkSelfPermission(this, it) == android.content.pm.PackageManager.PERMISSION_GRANTED
        }
        if (allFg && allBg) {
            startCountdown()
        }
    }

    private fun startCountdown() {
        startActivity(Intent(this, CountdownActivity::class.java))
    }

    fun fetchAndCachePhoneNode(context: Context, onResult: () -> Unit) {
        Wearable.getNodeClient(context).connectedNodes
            .addOnSuccessListener { nodes ->
                val phoneNode = nodes.firstOrNull()
                PhoneNode.phoneNodeId = phoneNode?.id
                onResult()
            }
    }

    private fun sendStartSignalToPhone(context: Context, nodeId: String) {
        val messageClient = Wearable.getMessageClient(context)
        messageClient.sendMessage(
            nodeId,
            "/running/start",
            ByteArray(0)
        ).addOnSuccessListener {
            Log.d("YoittangWatch", "러닝 시작 메시지 전송 완료")
        }.addOnFailureListener { e ->
            Toast.makeText(context, "러닝 시작 메시지 전송 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }
}

@Composable
fun MainScreen(onStartClick: () -> Unit = {}) {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        YoittangCircleButton(
            icon = Icons.Filled.PlayArrow,
            contentDescription = "러닝 시작",
            label = "러닝 시작",
            onClick = onStartClick
        )
    }
}