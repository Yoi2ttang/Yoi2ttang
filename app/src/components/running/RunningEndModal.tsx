import React from 'react';
import {Modal, Text, Pressable, Image, View} from 'react-native';
import {styled} from 'nativewind';
import Button from '../common/Button';
import {useRunningStatsContext} from '../../hooks/useRunningStatsContext';
// import {useUpdateEndRunning} from '@/hooks/running/useUpdateEndRunning';
import {useNavigation} from '@react-navigation/native';

interface RunningEndModalProps {
  visible?: boolean;
  setIsEndModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// styled components
const StyledModalBackground = styled(Pressable);
const StyledModalContent = styled(View);
const StyledText = styled(Text);
const StyledView = styled(View);

const RunningEndModal = ({
  visible,
  setIsEndModalOpen,
}: RunningEndModalProps) => {
  const navigation = useNavigation();
  const {runningId} = useRunningStatsContext();
  //   const {mutate: endRunning} = useUpdateEndRunning();

  //   const handleStopRunning = () => {
  //     if (!runningId) {
  //       console.error('러닝 ID 없음 - 종료 요청 불가');
  //       return;
  //     }

  //     endRunning(
  //       {
  //         runningId,
  //         endTime: new Date().toISOString(),
  //       },
  //       {
  //         onSuccess: () => {
  //           console.log('러닝 종료 성공');
  //           navigation.reset({index: 0, routes: [{name: 'TeamRanking'}]});
  //         },
  //         onError: error => {
  //           console.error('러닝 종료 실패', error);
  //         },
  //       },
  //     );
  //   };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <StyledModalBackground
        className="flex-1 items-center justify-center bg-black/70"
        onPress={() => setIsEndModalOpen(false)}>
        <StyledModalContent
          className="w-80 items-center gap-y-4 rounded-2xl bg-white p-6 mx-auto"
          onStartShouldSetResponder={() => true}>
          <StyledView className="items-center gap-1">
            <Image
              source={require('../../assets/icons/circle-check.png')}
              style={{width: 28, height: 28}}
            />
            <StyledText className="text-yoi-500 text-xl font-semibold">
              정말 점령을 완료할까요?
            </StyledText>
            <StyledText className="text-caption text-gray-500">
              현재까지의 기록이 반영됩니다.
            </StyledText>
          </StyledView>

          <StyledView className="flex w-full flex-row justify-center gap-4">
            <Button
              className="flex-1 bg-neutral-300"
              title="취소"
              onPress={() => setIsEndModalOpen(false)}
            />
            <Button className="flex-1 bg-yoi-500" title="종료하기" />
          </StyledView>
        </StyledModalContent>
      </StyledModalBackground>
    </Modal>
  );
};

export default RunningEndModal;
