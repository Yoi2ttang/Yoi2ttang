package com.ssafy.yoittang.activity;

import static java.lang.String.format;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;

import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.location.Location;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.UiThread;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.naver.maps.map.MapView;
import com.naver.maps.map.NaverMap;
import com.naver.maps.map.OnMapReadyCallback;
import com.naver.maps.map.overlay.LocationOverlay;
import com.naver.maps.map.overlay.OverlayImage;
import com.ssafy.yoittang.R;
import com.ssafy.yoittang.common.http.HttpClient;
import com.ssafy.yoittang.service.RunningService;
import com.ssafy.yoittang.service.TimerService;
import com.ssafy.yoittang.view.RotatedBoxView;

import android.os.CountDownTimer;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import java.util.Map;


public class RunningActivity extends AppCompatActivity implements OnMapReadyCallback {
    private FrameLayout countdownContainer, runningContainer;
    private TextView countdownText, timerText;
    private MapView mapView;
    private final Handler timerHandler = new Handler();
    private int runningSeconds = 0;

    private FusedLocationProviderClient fusedLocationClient;
    private float totalDistance = 0f;

    private BottomSheetBehavior<?> sheetBehavior;
    private View overlayInfo;
    private TextView tvTime, tvDistance, tvCalories, tvSpeed;
    private Button btnPauseResume, btnClose;
    private boolean isPaused = false;

    private NaverMap naverMap;
    private BroadcastReceiver timeReceiver;
    private static final String MAPVIEW_BUNDLE_KEY = "MapViewBundleKey";

    private RunningService runningService;
    private boolean bound = false;

    HttpClient httpClient = new HttpClient();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_running);

        // 뷰 바인딩
        countdownContainer = findViewById(R.id.countdown_container);
        runningContainer   = findViewById(R.id.running_container);
        countdownText      = findViewById(R.id.countdown_text);
        timerText          = findViewById(R.id.timer_text);
        mapView            = findViewById(R.id.map_fragment);
        ImageButton btnOverlay = findViewById(R.id.btn_overlay);
        //네모 박스
        RotatedBoxView boxView = findViewById(R.id.rotated_box);

        // BottomSheet
        overlayInfo   = findViewById(R.id.overlay_info);
        sheetBehavior = BottomSheetBehavior.from(overlayInfo);
        sheetBehavior.setState(BottomSheetBehavior.STATE_HIDDEN);

        tvTime     = findViewById(R.id.tv_time);
        tvDistance = findViewById(R.id.tv_distance);
        tvCalories = findViewById(R.id.tv_calories);
        tvSpeed    = findViewById(R.id.tv_speed);
        btnPauseResume = findViewById(R.id.btn_pause_resume);
        btnClose       = findViewById(R.id.btn_close);

        // 지도 초기화
        Bundle mapViewBundle = null;
        if (savedInstanceState != null) {
            mapViewBundle = savedInstanceState.getBundle(MAPVIEW_BUNDLE_KEY);
        }
        mapView.onCreate(mapViewBundle);
        mapView.getMapAsync(this);

        // 위치 서비스
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        // 오버레이 버튼
        btnOverlay.setOnClickListener(v -> {
            sheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
            overlayInfo.setVisibility(View.VISIBLE);
            updateOverlay(); // 최신 값 표시
        });

        btnClose.setOnClickListener(v -> sheetBehavior.setState(BottomSheetBehavior.STATE_HIDDEN));

        btnPauseResume.setOnClickListener(v -> {
            isPaused = !isPaused;
            btnPauseResume.setText(isPaused ? "Resume" : "Pause");
        });

        if (boxView != null) {
            int color = ContextCompat.getColor(this, R.color.orange); // 실제 색상값
            boxView.setBoxColor(color);
            boxView.setRotationAngle(-90f); // 확실히 눈에 보이도록

        } else {
            Log.e("BoxView", "boxView is null — XML에 추가되었는지 확인하세요.");
        }
        // 타일 수


        // 카운트다운 시작
        startCountdown();
    }

    @UiThread
    @Override
    public void onMapReady(@NonNull NaverMap naverMap) {
        this.naverMap = naverMap; // 네이버맵 객체 저장

//        // 여기서 naverMap 객체를 이용한 지도 설정 가능
//        // 예: 현재 위치로 이동
        LocationOverlay locationOverlay = naverMap.getLocationOverlay();
        locationOverlay.setVisible(true);

//        locationOverlay.setPosition(new LatLng(37.5666102, 126.9783881)); // 예시: 서울
//
//        // 지도 타입 설정
//        naverMap.setMapType(NaverMap.MapType.Basic);
//
//        // 줌 제한
        naverMap.setMinZoom(5.0);
        naverMap.setMaxZoom(18.0);
    }

    private final ServiceConnection runningServiceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            RunningService.LocalBinder binder = (RunningService.LocalBinder) service;
            runningService = binder.getService();
            bound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            bound = false;
        }
    };

    private void startCountdown() {
        new CountDownTimer(3000, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                int sec = (int)(millisUntilFinished / 1000) + 1;
                countdownText.setText(String.valueOf(sec));
            }

            @SuppressLint("UnspecifiedRegisterReceiverFlag")
            @Override
            public void onFinish() {
                countdownContainer.setVisibility(View.GONE);
                runningContainer.setVisibility(View.VISIBLE);

                // 먼저 BroadcastReceiver 등록
                timeReceiver = new BroadcastReceiver() {
                    @SuppressLint("DefaultLocale")
                    @Override
                    public void onReceive(Context context, Intent intent) {
                        int seconds = intent.getIntExtra("seconds", 0);
                        runningSeconds = seconds;
                        int hours = seconds / 3600;
                        int minutes = seconds / 60;
                        int secs = seconds % 60;
//                        Log.d("Time Count:", String.valueOf(seconds));
                        timerText.setText(String.format("%02d:%02d:%02d", hours, minutes, secs));
                    }
                };

                IntentFilter filter = new IntentFilter(RunningService.ACTION_RUNNING_SERVICE);
                ContextCompat.registerReceiver(RunningActivity.this, timeReceiver, filter,
                        ContextCompat.RECEIVER_NOT_EXPORTED);

                // 그 후 서비스 시작 및 바인딩
                Intent runningServiceIntent = new Intent(RunningActivity.this, RunningService.class);
                ContextCompat.startForegroundService(RunningActivity.this, runningServiceIntent); // API 26+
//                bindService(intent, runningServiceConnection, BIND_AUTO_CREATE);
//                startService(intent);



            }
        }.start();
    }

//
//    private void startLocationUpdates() {
//        LocationRequest req = LocationRequest.create()
//                .setInterval(2000)
//                .setFastestInterval(1000)
//                .setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
//
//        fusedLocationClient.requestLocationUpdates(req, new LocationCallback() {
//            @Override
//            public void onLocationResult(@NonNull LocationResult result) {
//                if (isPaused) return;
//                Location loc = result.getLastLocation();
//                if (loc != null) {
//                    if (previousLocation != null) {
//                        totalDistance += previousLocation.distanceTo(loc) / 1000f; // km
//                    }
//                    previousLocation = loc;
//                    // 지도 이동
//                    if (googleMap != null) {
//                        googleMap.animateCamera(CameraUpdateFactory.newLatLng(
//                                new LatLng(loc.getLatitude(), loc.getLongitude())));
//                    }
//                }
//            }
//        }, getMainLooper());
//    }

    @SuppressLint({"SetTextI18n", "DefaultLocale"})
    private void updateOverlay() {
        tvTime.setText("Time: " + timerText.getText());
        tvDistance.setText(format("Distance: %.2f km", totalDistance));
        // 아주 간단히: 60 kcal per km
        tvCalories.setText(format("Calories: %.0f kcal", totalDistance * 60));
        // km/h
        float hours = runningSeconds / 3600f;
        float speed = hours > 0 ? totalDistance / hours : 0;
        tvSpeed.setText(format("Speed: %.2f km/h", speed));
    }

    // ============= MapView 라이프사이클 연동 =============
    @SuppressLint("UnspecifiedRegisterReceiverFlag")
    @Override protected void onResume() {
        super.onResume(); mapView.onResume();
    }
    @SuppressLint("UnspecifiedRegisterReceiverFlag")
    @Override protected void onStart() {
        super.onStart();
        mapView.onStart();
    }

    @Override protected void onStop()         {
        super.onStop();
        mapView.onStop();
    }
    @Override protected void onPause() {
        mapView.onPause();
        super.onPause();

    }
    @Override protected void onDestroy()      {
        mapView.onDestroy();
        if (timeReceiver != null) {
            unregisterReceiver(timeReceiver);
        }
        if (bound) {
            unbindService(runningServiceConnection);
            bound = false;
        }
        super.onDestroy();
    }
    @Override public void onLowMemory()       { super.onLowMemory(); mapView.onLowMemory(); }
    @Override protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        Bundle bundle = outState.getBundle(MAPVIEW_BUNDLE_KEY);
        if (bundle == null) {
            bundle = new Bundle();
            outState.putBundle(MAPVIEW_BUNDLE_KEY, bundle);
        }
        mapView.onSaveInstanceState(bundle);
    }


}

