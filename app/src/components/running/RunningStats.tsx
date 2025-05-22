import React from 'react';
import {View, Text, Image} from 'react-native';
import {styled} from 'nativewind';
import {formatSecondsToTime} from '../../lib/time';

const StyledView = styled(View);
const StyledText = styled(Text);

interface RunningStatsProps {
  runningTime: number;
  distance: number;
  calories: number;
  speed: number;
  averagePace: number;
  tileCnt: number;
}

const RunningStats = ({
  runningTime,
  distance,
  calories,
  speed,
  averagePace,
  tileCnt,
}: RunningStatsProps) => {
  const formattedTime = formatSecondsToTime(runningTime);
  const distanceInKm = (distance / 1000).toFixed(2);

  return (
    <StyledView className="gap-2">
      <StyledText className="text-4xl font-bold italic">
        {distanceInKm}KM
      </StyledText>

      <StyledView className="flex-row gap-y-2">
        <StyledView className="flex-1 flex-col">
          <StyledText className="text-lg text-neutral-500">
            이동 시간
          </StyledText>
          <StyledText className="text-xl font-semibold">
            {formattedTime}
          </StyledText>
        </StyledView>
        <StyledView className="flex-1 flex-col">
          <StyledText className="text-lg text-neutral-500">
            소모 칼로리
          </StyledText>
          <StyledText className="text-xl font-semibold">
            {calories}kcal
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="flex-row gap-y-2">
        <StyledView className="flex-1 flex-col">
          <StyledText className="text-lg text-neutral-500">
            평균 속력
          </StyledText>
          <StyledText className="text-xl font-semibold">
            {speed.toFixed(2)}km/h
          </StyledText>
        </StyledView>
        <StyledView className="flex-1 flex-col">
          <StyledText className="text-lg text-neutral-500">
            평균 페이스
          </StyledText>
          <StyledText className="text-xl font-semibold">
            {isFinite(averagePace)
              ? `${Math.floor(averagePace / 60)}분 ${Math.round(
                  averagePace % 60,
                )}초`
              : '0분 0초'}
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="flex-row gap-y-2">
        <StyledView className="flex-1 flex-col">
          <StyledText className="text-lg text-neutral-500">
            평균 심박수
          </StyledText>
          <StyledView className="flex-row items-center gap-1">
            <Image
              source={require('../../assets/icons/heart-rate.png')}
              style={{width: 24, height: 24}}
            />
            <StyledText className="text-xl font-semibold">-</StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="flex-1 flex-col">
          <StyledText className="text-lg text-neutral-500">
            획득 타일
          </StyledText>
          <StyledView className="flex-row items-center gap-2">
            <StyledView className="bg-yoi-500 w-4 h-4 rotate-12" />
            <StyledText className="text-xl font-semibold">{tileCnt}</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default RunningStats;
