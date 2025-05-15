package com.ssafy.yoittang.service;

import static com.google.android.gms.location.LocationRequest.Builder.IMPLICIT_MIN_UPDATE_INTERVAL;


import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Binder;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.ssafy.yoittang.R;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class RunningService extends Service {
    private static final int NOTIF_ID = 1;
    private static final String CHANNEL_ID = "running_channel";
    private static final String CSV_NAME = "running_locations.csv";

    public static final String ACTION_RUNNING_SERVICE= "com.ssafy.yoittang.RUNNING_SERVICE";

    private final Handler handler = new Handler();
    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;
    private Runnable timerRunnable;
    private int runningSeconds = 0;
    private File csvFile;

    private boolean isRunning = true;
    private final IBinder binder = new LocalBinder();

    public class LocalBinder extends Binder {
        public RunningService getService() { return RunningService.this; }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        createNotificationChannel();

        // CSV 파일 준비
        csvFile = new File(getFilesDir(), CSV_NAME);
        if (!csvFile.exists()) {
            writeCsvHeader();
        }

        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult result) {
                Location loc = result.getLastLocation();
                if (loc != null) {
                    appendToCsv(loc.getLatitude(), loc.getLongitude());
                }
            }
        };
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();
        startForeground(NOTIF_ID, makeNotification("00:00", 0f));
        startTimer();
        startLocationUpdates();
        return START_STICKY;
    }

    private void writeCsvHeader() {
        try (FileWriter fw = new FileWriter(csvFile, false)) {
            fw.append("lat,lng\n");
            fw.flush();
        } catch (IOException e) {
            Log.d("CSV", "CSV Error: writeCsvHeader 에러");
        }
    }

    private void appendToCsv(double lat, double lng) {
        @SuppressLint("DefaultLocale")
        String line = String.format("%.6f,%.6f\n", lat, lng);
        try (FileWriter fw = new FileWriter(csvFile, true)) {
            fw.append(line);
            fw.flush();
        } catch (IOException e) {
            Log.d("CSV", "CSV Error: appendToCsv 에러");
        }
    }

    public void startTimer() {
        timerRunnable = new Runnable() {
            @Override
            public void run() {
                if(isRunning) {
                    runningSeconds++;
                    updateNotification();
                    Intent intent = new Intent(ACTION_RUNNING_SERVICE);
                    intent.setPackage(getPackageName());
                    intent.putExtra("seconds", runningSeconds);
                    sendBroadcast(intent);
                    handler.postDelayed(this, 1000);
                }
            }
        };
        handler.post(timerRunnable);
    }

    @SuppressLint("MissingPermission")
    private void startLocationUpdates() {
        LocationRequest req;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            req = new LocationRequest.Builder(5000L)
                    .setMinUpdateIntervalMillis(5000L)
                    .build();
        } else {
            req = LocationRequest.create()
                    .setInterval(5000)
                    .setFastestInterval(3000)
                    .setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        }

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            Log.e("RunningService", "위치 권한이 없습니다.");
            return;
        }

        fusedLocationClient.requestLocationUpdates(req, locationCallback, getMainLooper());
    }

    private Notification makeNotification(String time, float distance) {
        String content = String.format("Time: %s", time);
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Running Tracker")
                .setContentText(content)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setOngoing(true)
                .build();
    }

    private void updateNotification() {
        int min = runningSeconds / 60;
        int sec = runningSeconds % 60;
        String timeStr = String.format("%02d:%02d", min, sec);
        Notification n = makeNotification(timeStr, 0f);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        NotificationManagerCompat.from(this).notify(NOTIF_ID, n);
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "Running Tracker",
                    NotificationManager.IMPORTANCE_LOW
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    @Override
    public void onDestroy() {
        handler.removeCallbacks(timerRunnable);
        fusedLocationClient.removeLocationUpdates(locationCallback);
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
