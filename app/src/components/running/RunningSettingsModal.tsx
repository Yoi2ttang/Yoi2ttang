import React, {useState} from 'react';
import {View, Text, Pressable, Modal} from 'react-native';
import {styled} from 'nativewind';
import Switch from '../ui/Switch';
import Checkbox from '../ui/Checkbox';

interface RunningSettingsModalProps {
  onClose: () => void;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const RunningSettingsModal = ({onClose}: RunningSettingsModalProps) => {
  const [showTile, setShowTile] = useState(false);
  const [showMyTeamTile, setShowMyTeamTile] = useState(false);
  const [showOurTeamTile, setShowOurTeamTile] = useState(false);
  const [showEmptyTile, setShowEmptyTile] = useState(false);

  return (
    <Modal transparent animationType="fade">
      <StyledPressable
        className="flex-1 justify-center items-center bg-black/40"
        onPress={onClose}>
        {/* Touchable 영역이 겹치지 않도록 내부 View에 pointerEvents="box-none" 추가 */}
        <StyledView
          className="absolute bottom-12 right-8 w-44 rounded-lg bg-white p-4 shadow-lg z-10"
          pointerEvents="box-none">
          <StyledView className="space-y-3">
            {/* 타일 보기 */}
            <StyledView className="flex-row justify-between items-center">
              <StyledText className="text-sm text-neutral-700">
                타일 보기
              </StyledText>
              <Switch value={showTile} onValueChange={setShowTile} />
            </StyledView>

            {/* 내 타일 보기 */}
            <StyledView className="flex-row justify-between items-center">
              <StyledText className="text-sm text-neutral-700">
                내 타일 보기
              </StyledText>
              <Checkbox
                value={showMyTeamTile}
                onValueChange={setShowMyTeamTile}
              />
            </StyledView>

            {/* 우리 팀 타일 보기 */}
            <StyledView className="flex-row justify-between items-center">
              <StyledText className="text-sm text-neutral-700">
                우리 팀 타일 보기
              </StyledText>
              <Checkbox
                value={showOurTeamTile}
                onValueChange={setShowOurTeamTile}
              />
            </StyledView>

            {/* 빈 타일 보기 */}
            <StyledView className="flex-row justify-between items-center">
              <StyledText className="text-sm text-neutral-700">
                빈 타일 보기
              </StyledText>
              <Checkbox
                value={showEmptyTile}
                onValueChange={setShowEmptyTile}
              />
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledPressable>
    </Modal>
  );
};

export default RunningSettingsModal;
