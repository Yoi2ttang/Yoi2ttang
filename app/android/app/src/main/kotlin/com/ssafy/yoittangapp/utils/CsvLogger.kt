package com.ssafy.yoittangapp.utils

import android.content.Context
import android.util.Log
import java.io.File
import java.io.FileWriter
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class CsvLogger(private val context: Context) {

    companion object {
        private const val TAG = "CsvLogger"
        private const val FILE_NAME = "location_log.csv"
    }

    private val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
    private val file: File = File(context.filesDir, FILE_NAME)

    init {
        if (!file.exists()) {
            try {
                FileWriter(file, true).use { writer ->
                    writer.append("time,lat,lng\n")
                }
                Log.d(TAG, "CSV 파일 생성 및 헤더 작성 완료")
            } catch (e: Exception) {
                Log.e(TAG, "CSV 파일 생성 실패", e)
            }
        }
    }

    fun log(lat: Double, lng: Double) {
        try {
            val time = dateFormat.format(Date())
            FileWriter(file, true).use { writer ->
                writer.append("$time,$lat,$lng\n")
            }
            Log.d(TAG, "CSV 저장 완료: $time,$lat,$lng")
        } catch (e: Exception) {
            Log.e(TAG, "CSV 저장 실패", e)
        }
    }

    fun getCsvFile(): File = file
}
