package com.ssafy.yoittang.activity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import android.Manifest;
import android.content.pm.PackageManager;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1001;
    private static final int REQUEST_BACKGROUND_LOCATION_CODE = 1002;
    private static final String PREFS_NAME = "yoittang_prefs";
    private static final String KEY_BACKGROUND_LOCATION_SHOWN = "background_location_shown";

    private final String SpringServerUrl = "https://yoi2ttang.site";
    private ActivityResultLauncher<Intent> appSettingsLauncher;


    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        appSettingsLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    // 설정에서 돌아온 후 권한 확인
                    if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                            != PackageManager.PERMISSION_GRANTED) {
                        // 권한이 여전히 없으면 다이얼로그 다시 표시
                        showLocationPermissionExplanation();
                    }
                }
        );

        showLocationPermissionExplanation();

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        String cookies = CookieManager.getInstance().getCookie(SpringServerUrl);

        webView = new WebView(this);
        FrameLayout rootLayout = new FrameLayout(this);
        rootLayout.setFitsSystemWindows(true);
        rootLayout.addView(webView);
        setContentView(rootLayout);

        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setGeolocationEnabled(true);

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack();
                } else {
                    setEnabled(false); // 콜백을 끄고
                }
            }
        });

// 1. WebViewClient 설정 (페이지 로딩, 쿠키 등 담당)
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);

                String cookies = CookieManager.getInstance().getCookie(url);
                Log.d("쿠키확인", "onPageFinished: " + cookies);
                cookieManager.flush();

            }

        });

// 2. WebChromeClient 설정 (위치 권한, 알림창 등 담당)
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                // 항상 위치 권한 허용
                callback.invoke(origin, true, false);
            }

        });

        //
        webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void onUrlChanged(String url) {
                Log.d("WebView", "JS에서 전달된 URL: " + url);
                if (url.contains("/running")) {
                    Intent intent = new Intent(MainActivity.this, RunningActivity.class);
                    startActivity(intent);
                }
            }
        }, "AndroidBridge");

        webView.loadUrl("https://yoi2ttang.site");

    }

    private void showLocationPermissionExplanation() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            new AlertDialog.Builder(this)
                    .setTitle("권한 필요")
                    .setMessage("이 앱은 위치 기반 서비스를 제공하기 위해 위치 권한이 필요합니다.")
                    .setCancelable(false)
                    .setPositiveButton("권한 주기", (dialog, which) ->
                        requestFineLocation()
                    )
                    .setNegativeButton("종료하기", (dialog, which) -> {
                        finish(); // 앱 종료
                    })
                    .show();
        }
    }

    private void requestFineLocation() {
        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                LOCATION_PERMISSION_REQUEST_CODE);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // 권한이 허용되었을 때 실행할 코드
                // 예: 위치 관련 기능 시작 등
            } else {
                // 사용자가 '다시 묻지 않기'를 눌렀는지 확인
                boolean shouldShowRationale = ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.ACCESS_FINE_LOCATION);

                if (shouldShowRationale) {
                    // 단순 거부 - 다시 다이얼로그 보여주기
                    showLocationPermissionExplanation();
                } else {
                    // '다시 묻지 않기'를 선택한 경우 - 설정으로 유도
                    new AlertDialog.Builder(this)
                            .setTitle("권한 필요")
                            .setMessage("위치 권한이 영구적으로 거부되었습니다.\n앱 설정에서 수동으로 권한을 허용해주세요.")
                            .setCancelable(false)
                            .setPositiveButton("설정 열기", (dialog, which) -> goToAppSettings())
                            .setNegativeButton("종료하기", (dialog, which) -> finish())
                            .show();
                }
            }
        }
    }

    private void goToAppSettings() {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(Uri.parse("package:" + getApplicationContext().getPackageName()));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        appSettingsLauncher.launch(intent);
    }


    @Override
    protected void onStop() {
        super.onStop();
        String cookies = CookieManager.getInstance().getCookie(SpringServerUrl);
        Log.d("쿠키확인", "onStop: " + cookies);
        CookieManager.getInstance().flush();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (webView != null) {
            webView.loadUrl("about:blank");
            webView.stopLoading();
            webView.setWebViewClient(null);
            webView.destroy();
            webView = null;
        }

        String cookies = CookieManager.getInstance().getCookie(SpringServerUrl);
        Log.d("쿠키확인", "onDestroy: " + cookies);

        CookieManager.getInstance().flush();
        Log.d("onDestroy", "WebView 및 쿠키 정리 완료");
    }
}
