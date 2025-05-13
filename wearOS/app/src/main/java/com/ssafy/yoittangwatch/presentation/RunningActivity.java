package com.ssafy.yoittangwatch.presentation;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.ssafy.yoittangwatch.R;

public class RunningActivity extends AppCompatActivity {

    private TextView distanceText, paceText, timeText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_running);

        distanceText = findViewById(R.id.text_distance);
        paceText = findViewById(R.id.text_pace);
        timeText = findViewById(R.id.text_time);

        // 초기 상태
        distanceText.setText("0.00 km");
        paceText.setText("0'00");
        timeText.setText("00:00");

        // 러닝 정지 버튼
        Button pauseButton = findViewById(R.id.stop_button);
        pauseButton.setOnClickListener(v -> {
            Toast.makeText(this, "러닝 종료!", Toast.LENGTH_SHORT).show();
        });
    }
}

