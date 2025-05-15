package com.ssafy.yoittang.view;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

import com.ssafy.yoittang.R;

public class RotatedBoxView extends View {

    private Paint paint;
    private int boxColor = R.color.orange; // 기본 색상: 검정
    private float rotationAngle = -12f; // 기본 회전 각도: -12도 (왼쪽으로)

    public RotatedBoxView(Context context) {
        super(context);
        init();
    }

    public RotatedBoxView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public RotatedBoxView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        paint = new Paint();
        paint.setColor(boxColor);
        paint.setStyle(Paint.Style.FILL);
        paint.setAntiAlias(true);
        Log.d("RotatedBoxView", "width: " + getWidth() + ", height: " + getHeight());
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        float size = 60f;
        float centerX = getWidth() / 2f;
        float centerY = getHeight() / 2f;

        canvas.save();
        canvas.rotate(rotationAngle, centerX, centerY); // 동적 회전 적용

        canvas.drawRect(
                centerX - size / 2,
                centerY - size / 2,
                centerX + size / 2,
                centerY + size / 2,
                paint
        );

        canvas.restore();
    }

    // ✅ 외부에서 색 변경
    public void setBoxColor(int color) {
        this.boxColor = color;
        paint.setColor(color);
        invalidate(); // 다시 그리기 요청
    }

    // ✅ 외부에서 회전 각도 변경
    public void setRotationAngle(float angle) {
        this.rotationAngle = angle;
        invalidate(); // 다시 그리기 요청
    }

    // (선택) 현재 회전 각도 가져오기
    public float getRotationAngle() {
        return this.rotationAngle;
    }
}
