package com.ssafy.yoittang.service;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;

public class TimerService extends Service {
    public static final String ACTION_TIMER_TICK = "com.ssafy.yoittang.TIMER_TICK";
    private final IBinder binder = new LocalBinder();
    private final Handler handler = new Handler();
    private int seconds = 0;
    private boolean isRunning = true;

    private final Runnable tickRunnable = new Runnable() {
        @Override
        public void run() {
            if (isRunning) {
                seconds++;
                Intent intent = new Intent(ACTION_TIMER_TICK);
                intent.setPackage(getPackageName());
                intent.putExtra("seconds", seconds);
                sendBroadcast(intent);
            }
            handler.postDelayed(this, 1000);
        }
    };

    public class LocalBinder extends Binder {
        public TimerService getService() {
            return TimerService.this;
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        handler.post(tickRunnable);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        isRunning = true;
        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    public void pauseTimer() {
        isRunning = false;
    }

    public void resumeTimer() {
        isRunning = true;
    }

    public int getSeconds() {
        return seconds;
    }

    @Override
    public void onDestroy() {
        handler.removeCallbacks(tickRunnable);
        super.onDestroy();
    }
}