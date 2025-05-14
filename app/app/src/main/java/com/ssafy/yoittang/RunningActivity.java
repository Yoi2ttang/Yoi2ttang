package com.ssafy.yoittang;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class RunningActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        TextView textView = new TextView(this);
        textView.setText("네이티브 화면입니다");
        textView.setTextSize(24);
        textView.setPadding(50, 200, 50, 50);

        setContentView(textView);
    }

}
