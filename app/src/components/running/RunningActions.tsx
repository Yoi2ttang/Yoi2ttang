import React, {useState, Dispatch, SetStateAction} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styled} from 'nativewind';
import RunningEndModal from './RunningEndModal';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

interface RunningActionsProps {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
}

const RunningActions = ({isPaused, setIsPaused}: RunningActionsProps) => {
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  return (
    <StyledView className="flex-row items-end justify-between text-center text-sm mt-6">
      {/* 일시정지 / 다시달리기 */}
      <StyledTouchable
        className="h-24 w-24 flex-co items-center justify-center rounded-full  bg-neutral-300"
        onPress={() => setIsPaused(prev => !prev)}>
        {isPaused ? (
          <StyledView className="flex-col items-center justify-center gap-y-1">
            <Image
              source={require('../../assets/icons/start-running.png')}
              style={{width: 28, height: 28}}
            />
            <StyledText>다시 달리기</StyledText>
          </StyledView>
        ) : (
          <StyledView className="flex-col items-center justify-center gap-y-1">
            <Image
              source={require('../../assets/icons/pause-running.png')}
              style={{width: 28, height: 28}}
            />
            <StyledText>일시 정지</StyledText>
          </StyledView>
        )}
      </StyledTouchable>

      {/* 점령 완료 */}
      <StyledTouchable
        className="h-24 w-24 flex-col items-center justify-center rounded-full gap-y-1 bg-yoi-500"
        onPress={() => setIsEndModalOpen(true)}>
        <Image
          source={require('../../assets/icons/finish-running.png')}
          style={{width: 28, height: 28}}
        />
        <StyledText className="text-white">점령 완료</StyledText>
      </StyledTouchable>

      {/* 공유 */}
      <StyledTouchable className="h-24 w-24 flex-col items-center justify-center gap-y-1 rounded-full border-2 border-neutral-500">
        <Image
          source={require('../../assets/icons/share-running.png')}
          style={{width: 28, height: 28}}
        />
        <StyledText>공유</StyledText>
      </StyledTouchable>

      {isEndModalOpen && (
        <RunningEndModal
          visible={isEndModalOpen}
          setIsEndModalOpen={setIsEndModalOpen}
        />
      )}
    </StyledView>
  );
};

export default RunningActions;
