package com.ssafy.yoittangWatch.presentation.common.util
import kotlin.math.*

fun haversine(lat1: Double, lon1: Double, lat2: Double, lon2: Double): Double {
    val R = 6371000.0 // 지구 반지름 (미터)
    val dLat = Math.toRadians(lat2 - lat1)
    val dLon = Math.toRadians(lon2 - lon1)
    val a = sin(dLat / 2).pow(2) +
            cos(Math.toRadians(lat1)) * cos(Math.toRadians(lat2)) *
            sin(dLon / 2).pow(2)
    val c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c
}

fun calculatePace(seconds: Int, distanceMeters: Double): String {
    if (distanceMeters < 1.0) return "0'00" // 아직 1m도 안 갔으면 페이스 의미 없음

    val pace = (seconds / 60.0) / (distanceMeters / 1000.0) // 분/km
    val min = pace.toInt()
    val sec = ((pace - min) * 60).toInt()
    return String.format("%d'%02d", min, sec)
}
