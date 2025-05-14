package com.ssafy.yoittangWatch.presentation.countdown

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import com.ssafy.yoittangWatch.presentation.running.RunningActivity
import com.ssafy.yoittangWatch.presentation.theme.YoittangWatchTheme
import kotlinx.coroutines.delay

class CountdownActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            YoittangWatchTheme {
                CountdownScreen()
            }
        }
    }
}

@Composable
fun CountdownScreen() {
    val context = LocalContext.current
    var count by remember { mutableStateOf(3) }

    // 카운트다운 로직
    LaunchedEffect(Unit) {
        while (count >= 1) {
            delay(1000L)
            count--
        }
        delay(1000L) // 마지막 "요이땅!" 표시 시간
        context.startActivity(Intent(context, RunningActivity::class.java))
    }

    val textToShow = if (count >= 1) "$count" else "요이땅!"

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = textToShow,
            style = MaterialTheme.typography.display1,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )
    }
}
