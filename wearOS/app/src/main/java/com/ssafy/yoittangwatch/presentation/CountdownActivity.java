package com.ssafy.yoittangwatch.presentation;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.ssafy.yoittangwatch.R;

public class CountdownActivity extends AppCompatActivity {

    private TextView countdownText;
    private final String[] messages = {"3!", "2!", "1!", "요이땅!"};
    private int index = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_countdown);

        countdownText = findViewById(R.id.countdown_text);
        startCountdown();
    }

    private void startCountdown() {
        Handler handler = new Handler(Looper.getMainLooper());

        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                if (index < messages.length) {
                    countdownText.setText(messages[index]);
                    index++;
                    handler.postDelayed(this, 1000);
                } else {
                    Intent intent = new Intent(CountdownActivity.this, RunningActivity.class);
                    startActivity(intent);
                    finish();
                }
            }
        };

        handler.post(runnable);
    }
}
