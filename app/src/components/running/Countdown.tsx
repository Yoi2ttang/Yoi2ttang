// components/running/Countdown.tsx
import {View, Text} from 'react-native';

interface CountdownProps {
  count: number;
}

const Countdown = ({count}: CountdownProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 96, color: 'white', fontWeight: 'bold'}}>
        {count}
      </Text>
    </View>
  );
};

export default Countdown;
