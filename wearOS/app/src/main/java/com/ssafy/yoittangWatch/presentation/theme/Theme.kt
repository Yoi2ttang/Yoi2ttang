package com.ssafy.yoittangWatch.presentation.theme

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.wear.compose.material.Colors
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Typography

private val customColors = Colors(
    primary = Color(0xFFFF5434),
    onPrimary = Color.Black,
    secondary = Color(0xFFFF7C64),
    onSecondary = Color.Black,
    surface = Color.Black,
    onSurface = Color.White
)

private val customTypography = Typography(
    display1 = TextStyle(
        fontSize = 36.sp,
        fontWeight = FontWeight.Bold
        ),
    title1 = TextStyle(
        fontSize = 20.sp,
        fontWeight = FontWeight.Bold
    ),
    body1 = TextStyle(fontSize = 16.sp)
)

@Composable
fun YoittangWatchTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colors = customColors,
        typography = customTypography,
        content = content
    )
}