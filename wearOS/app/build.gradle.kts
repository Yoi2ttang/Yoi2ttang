plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.ssafy.yoittangapp"

    compileSdk = 34

    defaultConfig {
        applicationId = "com.ssafy.yoittangapp"
        minSdk = 33
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }

    signingConfigs {
        create("unifiedDebug") {
            // mobile 모듈에 있는 키 경로 (프로젝트 구조에 맞게 수정)
            storeFile = file("$rootDir/../app/android/app/debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        getByName("debug") {
            // Kotlin DSL에서는 이렇게 지정
            signingConfig = signingConfigs.getByName("unifiedDebug")
        }
        // release 타입은 그대로 두어도 무방
    }

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.11"
    }

    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    implementation("androidx.wear.compose:compose-foundation:1.4.1")
    implementation("androidx.wear.compose:compose-navigation:1.4.1")
    implementation(libs.wear.tooling.preview)
    implementation(libs.appcompat)
    implementation(libs.play.services.wearable)
    debugImplementation("androidx.wear.compose:compose-ui-tooling:1.4.1")

    implementation("androidx.activity:activity-compose:1.9.3")

    implementation ("androidx.health:health-services-client:1.1.0-alpha05")

    implementation("androidx.compose.material:material-icons-core:1.5.4")
    implementation("androidx.compose.material:material-icons-extended:1.5.4")

    implementation ("com.google.guava:guava:31.0-android")

    implementation ("androidx.concurrent:concurrent-futures:1.2.0")
    implementation ("androidx.appcompat:appcompat:1.7.0")

    implementation("androidx.compose.runtime:runtime:1.5.4")
    implementation("androidx.compose.ui:ui:1.5.4")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")

    implementation ("androidx.core:core-splashscreen:1.1.0-rc01")

    implementation ("com.google.android.gms:play-services-location:21.0.1")
}
