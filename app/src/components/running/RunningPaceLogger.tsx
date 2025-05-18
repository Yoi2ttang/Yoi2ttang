import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styled} from 'nativewind';
import {useRunningStats} from '../../hooks/useRunningStats';
import Button from '../common/Button';

const StyledView = styled(View);
const StyledText = styled(Text);

const formatPace = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${min}분 ${sec}초`;
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}분 ${s}초`;
};

const formatDistance = (m: number) => `${m.toFixed(1)}m`;

interface RunningPaceLoggerProps {
  paceHistory: ReturnType<typeof useRunningStats>['paceHistory'];
  saveCurrentPace: () => void;
}

const StyledScrollView = styled(ScrollView);

const RunningPaceLogger = ({
  paceHistory,
  saveCurrentPace,
}: RunningPaceLoggerProps) => {
  return (
    <StyledView className="mt-4">
      <StyledView className="flex-row items-center justify-between">
        <StyledText className="text-lg text-neutral-500">
          구간 페이스
        </StyledText>
        <Button
          title="+ 구간 기록"
          variant="default"
          className="rounded-md px-3 py-1"
          onPress={saveCurrentPace}
        />
      </StyledView>

      <StyledScrollView
        className="h-64 py-3"
        contentContainerStyle={{gap: 10}}
        showsVerticalScrollIndicator={true}>
        {paceHistory.length === 0 ? (
          <StyledText className="mt-10 text-center text-sm text-neutral-400">
            아직 기록된 구간이 없습니다.
          </StyledText>
        ) : (
          paceHistory.map((p, i) => (
            <StyledView
              key={i}
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 shadow-sm">
              <StyledView className="flex-row justify-between">
                <StyledText className="mb-1 text-sm font-medium">
                  {i + 1}구간
                </StyledText>
                <StyledText className="text-sm font-semibold text-yoi-500">
                  {formatPace(p.pace)} / km
                </StyledText>
              </StyledView>
              <StyledView className="mt-1 flex-row justify-between">
                <StyledText className="text-sm text-neutral-500">
                  {formatTime(p.fromTime)} → {formatTime(p.toTime)}
                </StyledText>
                <StyledText className="text-sm text-neutral-500">
                  {formatDistance(p.fromDistance)} →{' '}
                  {formatDistance(p.toDistance)}
                </StyledText>
              </StyledView>
            </StyledView>
          ))
        )}
      </StyledScrollView>
    </StyledView>
  );
};

export default RunningPaceLogger;
