import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {styled} from 'nativewind';

interface RunningSettingsButtonProps {
  onClick: () => void;
  selectedTileView: 'my' | 'team' | 'empty' | null;
}

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledView = styled(View);

const getTileViewLabel = (view: 'my' | 'team' | 'empty' | null) => {
  switch (view) {
    case 'my':
      return '내 타일 보기';
    case 'team':
      return '우리 팀 타일 보기';
    case 'empty':
      return '빈 타일 보기';
    default:
      return '';
  }
};

const RunningSettingsButton = ({
  onClick,
  selectedTileView,
}: RunningSettingsButtonProps) => (
  <StyledPressable
    onPress={onClick}
    className="absolute right-4 bottom-8 z-10 rounded-full bg-white pr-3 py-2 shadow-md active:scale-95 flex-row items-center gap-x-2">
    <Image
      source={require('../../assets/icons/settings.png')}
      style={{width: 20, height: 20}}
    />
    {selectedTileView !== null && (
      <StyledText className="text-sm text-gray-800 font-medium">
        {getTileViewLabel(selectedTileView)}
      </StyledText>
    )}
  </StyledPressable>
);

export default RunningSettingsButton;
