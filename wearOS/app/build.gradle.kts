plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.ssafy.yoittangWatch"

    compileSdk = 34

    defaultConfig {
        applicationId = "com.ssafy.yoittangWatch"
        minSdk = 33
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
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
}
