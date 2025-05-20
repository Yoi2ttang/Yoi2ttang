// foregroundServiceTest.tsx

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  NativeModules,
  DeviceEventEmitter,
  StyleSheet,
} from 'react-native';

const { Foreground } = NativeModules;

export default function ForegroundServiceTest(): React.JSX.Element {
  useEffect(() => {
    // 1) 마운트 시 서비스 실행
    Foreground.startService();

    // 2) 이벤트 구독
    const subMetrics = DeviceEventEmitter.addListener(
      'metricsFromWatch',
      (data) => console.log('📊 메트릭:', data),
    );
    const subStart = DeviceEventEmitter.addListener(
      'runningStartedFromWatch',
      () => console.log('▶️ 워치에서 러닝 시작'),
    );
    const subStop = DeviceEventEmitter.addListener(
      'runningStoppedFromWatch',
      () => console.log('⏸️ 워치에서 러닝 종료'),
    );

    return () => {
      // 언마운트 시 서비스 중지 & 리스너 해제
      Foreground.stopService();
      subMetrics.remove();
      subStart.remove();
      subStop.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ForegroundService 테스트</Text>
      <View style={styles.buttonRow}>
        <Button
          title="서비스 시작"
          onPress={() => Foreground.startService()}
        />
        <Button
          title="서비스 중지"
          onPress={() => Foreground.stopService()}
        />
      </View>
      <View style={styles.info}>
        <Text>로그캣(Logcat)과 터미널에서</Text>
        <Text>서비스 & 이벤트 흐름을 확인하세요</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  info: {
    alignItems: 'center',
    marginTop: 40,
  },
});
