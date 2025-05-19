package com.ssafy.yoittangWatch.presentation.running

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Stop
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import com.google.android.gms.wearable.Wearable
import com.ssafy.yoittangWatch.application.running.RunningForegroundService
import com.ssafy.yoittangWatch.presentation.common.PhoneNode
import com.ssafy.yoittangWatch.presentation.common.YoittangCircleButton
import com.ssafy.yoittangWatch.presentation.common.util.PermissionHelper
import com.ssafy.yoittangWatch.presentation.common.util.calculatePace
import com.ssafy.yoittangWatch.presentation.common.util.formatElapsedTime
import com.ssafy.yoittangWatch.presentation.common.util.getCurrentTimeString
import com.ssafy.yoittangWatch.presentation.main.MainActivity
import com.ssafy.yoittangWatch.presentation.theme.YoittangWatchTheme
import kotlinx.coroutines.delay

class RunningActivity : ComponentActivity() {

    private val TAG = "RunningActivity"

    object HeartRateHolder {
        private val _bpm = mutableStateOf<Int?>(null)
        val bpm: State<Int?> = _bpm
        fun update(value: Int?) {
            _bpm.value = value
        }
    }

    object DistanceHolder {
        private val _distance = mutableStateOf<Double?>(null)
        val distance: State<Double?> = _distance
        fun update(value: Double?) {
            _distance.value = value
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        PermissionHelper.ensurePermissions()
        setContent { YoittangWatchTheme { RunningScreen() } }

        // 서비스 START
        val startIntent = Intent(this, RunningForegroundService::class.java).apply {
            action = RunningForegroundService.ACTION_START
        }
        ContextCompat.startForegroundService(this, startIntent)
    }

    override fun onResume() {
        super.onResume()
        PermissionHelper.ensurePermissions()
    }

    private fun sendStopSignalToPhone(context: Context, nodeId: String) {
        val messageClient = Wearable.getMessageClient(context)
        messageClient.sendMessage(
            nodeId,
            "/running/stop",   // 스마트폰 앱에서 이 path를 수신 리스너에 등록해야 함
            ByteArray(0)
        ).addOnSuccessListener {
            Log.d("YoittangWatch", "러닝 종료 메시지 전송 완료")
        }.addOnFailureListener { e ->
            Toast.makeText(context, "러닝 종료 메시지 전송 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    fun stopRunning(context: Context, activity: Activity) {
        // 스마트폰으로 종료 신호 전송
        PhoneNode.phoneNodeId?.let { nodeId ->
            sendStopSignalToPhone(this, nodeId)
        }

        // 서비스에게 STOP 액션 전달
        val stopIntent = Intent(this, RunningForegroundService::class.java).apply {
            action = RunningForegroundService.ACTION_STOP
        }
        startService(stopIntent)

        // 메인화면 이동
        navigateToMain(activity)
    }

    private fun navigateToMain(activity: Activity) {
        val intent = Intent(activity, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
        }
        activity.startActivity(intent)
    }
}

@Composable
fun RunningScreen() {
    // 현재 시간 상태
    val currentTime = remember { mutableStateOf(getCurrentTimeString()) }
    val elapsedSeconds = remember { mutableStateOf(0) }
    val context = LocalContext.current
    val activity = context as? Activity
    val distance = RunningActivity.DistanceHolder.distance.value ?: 0.00
    val paceText = calculatePace(elapsedSeconds.value, distance)

    // 1초마다 시간 갱신
    LaunchedEffect(Unit) {
        while (true) {
            currentTime.value = getCurrentTimeString()
            elapsedSeconds.value++
            delay(1000)
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(8.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .offset(y = 20.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(text = currentTime.value, style = MaterialTheme.typography.body1)
            Text(
                text = "${"%.2f".format(distance / 1000f)} km",
                style = MaterialTheme.typography.display1
            )
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                Text(text = paceText, style = MaterialTheme.typography.body1)
                Text(
                    text = formatElapsedTime(elapsedSeconds.value),
                    style = MaterialTheme.typography.body1
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(text = "❤️", fontSize = 16.sp)
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = RunningActivity.HeartRateHolder.bpm.value?.toString() ?: "-",
                    style = MaterialTheme.typography.body1
                )
            }
        }
        YoittangCircleButton(
            icon = Icons.Filled.Stop,
            contentDescription = "러닝 종료",
            onClick = {
                (activity as? RunningActivity)?.stopRunning(context, activity)
            },
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .offset(y = 160.dp),
            iconOffsetY = (-75).dp
        )
    }
}
