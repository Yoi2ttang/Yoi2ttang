package com.ssafy.yoittangapp.presentation.common.util

import java.time.ZoneId
import java.time.ZonedDateTime

public fun getCurrentTimeString(): String {
    val now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalTime()
    return String.format("%02d:%02d", now.hour, now.minute)
}

public fun formatElapsedTime(seconds: Int): String {
    val minutes = seconds / 60
    val remainingSeconds = seconds % 60
    return String.format("%02d:%02d", minutes, remainingSeconds)
}

