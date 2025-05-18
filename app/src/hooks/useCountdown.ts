import {useEffect, useState} from 'react';

interface useCountdownProps {
  start: number;
  onComplete: () => void;
}

const useCountdown = ({start, onComplete}: useCountdownProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (count > 1) {
      const timer = setTimeout(() => setCount(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onComplete(), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return count;
};

export default useCountdown;
