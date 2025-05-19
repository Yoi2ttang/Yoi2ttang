package com.ssafy.yoittangWatch.presentation.main

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import com.ssafy.yoittangWatch.R
import com.ssafy.yoittangWatch.presentation.common.PhoneNode
import com.ssafy.yoittangWatch.presentation.common.util.PermissionHelper
import com.ssafy.yoittangWatch.presentation.common.YoittangCircleButton
import com.ssafy.yoittangWatch.presentation.countdown.CountdownActivity
import com.ssafy.yoittangWatch.presentation.theme.YoittangWatchTheme

class MainActivity : ComponentActivity() {

    private val messageListener = MessageClient.OnMessageReceivedListener { messageEvent ->
        if (messageEvent.path == "/running/start") {
            Log.d("MainActivity", "Received start message")
            startCountdown()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 권한 런처 등록 (onAllGranted 콜백은 비워둠)
        PermissionHelper.registerLaunchers(this)

        // 페어링된 워치 노드 가져오기 후 처리
        fetchAndCachePhoneNode(this) {
            if (PhoneNode.phoneNodeId == null) {
                showPairingAlert()
            } else {
                // 권한 체크 및 요청 (버튼 클릭 시 처리)
                // UI 설정
                setContent {
                    YoittangWatchTheme {
                        MainScreen(onStartClick = { handleStartClick() })
                    }
                }
            }
        }

        // 알림 채널 생성
        createNotificationChannel()
    }

    override fun onResume() {
        super.onResume()
        PermissionHelper.ensurePermissions()
        Wearable.getMessageClient(this).addListener(messageListener)
    }

    override fun onPause() {
        super.onPause()
        Wearable.getMessageClient(this).removeListener(messageListener)
    }

    private fun handleStartClick() {
        // 페어링 기기 확인
        if (PhoneNode.phoneNodeId == null) {
            showPairingAlert()
            return
        }

        // 권한 체크 및 요청
        if (!PermissionHelper.allPermissionsGranted()) {
            PermissionHelper.ensurePermissions()
            return
        }

        // 카운트다운 시작 및 워치에 신호 전송
        startCountdown()
        sendStartSignalToPhone(PhoneNode.phoneNodeId!!)
    }

    private fun startCountdown() {
        startActivity(Intent(this, CountdownActivity::class.java))
    }

    private fun showPairingAlert() {
        AlertDialog.Builder(this)
            .setTitle(getString(R.string.pairing_alert_title))
            .setMessage(getString(R.string.pairing_alert_message))
            .setCancelable(false)
            .setPositiveButton(android.R.string.ok) { _, _ -> finishAffinity() }
            .show()
    }

    private fun createNotificationChannel() {
        val channelId = getString(R.string.notification_channel_id_running)
        val channelName = getString(R.string.notification_channel_name_running)
        val channelDesc = getString(R.string.notification_channel_description_running)

        val channel = android.app.NotificationChannel(
            channelId,
            channelName,
            android.app.NotificationManager.IMPORTANCE_LOW
        ).apply { description = channelDesc }

        val manager = getSystemService(android.app.NotificationManager::class.java)
        manager.createNotificationChannel(channel)
    }

    private fun fetchAndCachePhoneNode(context: Context, onResult: () -> Unit) {
        Wearable.getNodeClient(context).connectedNodes
            .addOnSuccessListener { nodes ->
                PhoneNode.phoneNodeId = nodes.firstOrNull()?.id
                onResult()
            }
    }

    private fun sendStartSignalToPhone(nodeId: String) {
        Wearable.getMessageClient(this)
            .sendMessage(nodeId, "/running/start", ByteArray(0))
            .addOnSuccessListener {
                Log.d("MainActivity", "러닝 시작 메시지 전송 완료")
            }
            .addOnFailureListener { e ->
                Toast.makeText(
                    this,
                    "러닝 시작 메시지 전송 실패: ${e.message}",
                    Toast.LENGTH_SHORT
                ).show()
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
