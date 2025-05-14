package com.ssafy.yoittangWatch.presentation.common

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.wear.compose.material.*

@Composable
fun YoittangCircleButton(
    icon: ImageVector,
    contentDescription: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    iconOffsetY: Dp = 0.dp,
    iconSize: Dp = 36.dp,
    label: String? = null
) {
    Button(
        onClick = onClick,
        modifier = modifier.size(200.dp),
        shape = CircleShape,
        colors = ButtonDefaults.buttonColors(
            backgroundColor = MaterialTheme.colors.primary
        )
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                imageVector = icon,
                contentDescription = contentDescription,
                tint = Color.Black,
                modifier = Modifier
                    .size(iconSize)
                    .offset(y = iconOffsetY)
            )
            if (label != null) {
                Text(
                    text = label,
                    style = MaterialTheme.typography.title1,
                    color = Color.Black
                )
            }
        }
    }
}
