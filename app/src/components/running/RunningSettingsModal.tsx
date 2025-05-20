import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {styled} from 'nativewind';
import Switch from '../ui/Switch';
import Checkbox from '../ui/Checkbox';

interface RunningSettingsModalProps {
  onClose: () => void;
  showTile: boolean;
  setShowTile: Dispatch<SetStateAction<boolean>>;
  selectedTileView: 'my' | 'team' | 'empty' | null;
  setSelectedTileView: Dispatch<SetStateAction<'my' | 'team' | 'empty' | null>>;
}

const StyledView = styled(View);
const StyledText = styled(Text);

const RunningSettingsModal = ({
  onClose,
  showTile,
  setShowTile,
  selectedTileView,
  setSelectedTileView,
}: RunningSettingsModalProps) => {
  // ✅ 타일 보기 스위치 변경 시 동작
  const handleToggleShowTile = (value: boolean) => {
    setShowTile(value);
    if (!value) {
      setSelectedTileView(null);
    } else if (!selectedTileView) {
      setSelectedTileView('my'); // 꺼졌다 켜질 때 기본값
    }
  };

  return (
    <Modal transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <StyledView className="flex-1 bg-black/40 justify-end">
          <TouchableWithoutFeedback>
            <StyledView className="mx-4 mb-6 rounded-2xl bg-white px-6 py-5 shadow-lg">
              <StyledText className="text-base font-semibold text-gray-800 mb-2">
                보기 옵션 설정
              </StyledText>

              <StyledView className="border-b border-gray-200 mb-3" />

              <StyledView className="space-y-4">
                {/* ✅ 타일 보기 스위치 */}
                <StyledView className="flex-row justify-between items-center">
                  <StyledText className="text-sm text-gray-700">
                    타일 보기
                  </StyledText>
                  <Switch
                    value={showTile}
                    onValueChange={handleToggleShowTile}
                  />
                </StyledView>

                {/* ✅ 보기 항목들 - showTile이 true일 때만 */}
                {showTile && (
                  <StyledView className="space-y-4">
                    <StyledView className="flex-row justify-between items-center pr-3">
                      <StyledText className="text-sm text-gray-700">
                        내 타일 보기
                      </StyledText>
                      <Checkbox
                        value={selectedTileView === 'my'}
                        onValueChange={() =>
                          setSelectedTileView(prev =>
                            prev === 'my' ? null : 'my',
                          )
                        }
                      />
                    </StyledView>

                    <StyledView className="flex-row justify-between items-center pr-3">
                      <StyledText className="text-sm text-gray-700">
                        우리 팀 타일 보기
                      </StyledText>
                      <Checkbox
                        value={selectedTileView === 'team'}
                        onValueChange={() =>
                          setSelectedTileView(prev =>
                            prev === 'team' ? null : 'team',
                          )
                        }
                      />
                    </StyledView>

                    <StyledView className="flex-row justify-between items-center pr-3">
                      <StyledText className="text-sm text-gray-700">
                        빈 타일 보기
                      </StyledText>
                      <Checkbox
                        value={selectedTileView === 'empty'}
                        onValueChange={() =>
                          setSelectedTileView(prev =>
                            prev === 'empty' ? null : 'empty',
                          )
                        }
                      />
                    </StyledView>
                  </StyledView>
                )}
              </StyledView>
            </StyledView>
          </TouchableWithoutFeedback>
        </StyledView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RunningSettingsModal;
