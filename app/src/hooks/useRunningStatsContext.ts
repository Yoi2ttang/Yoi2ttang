import {createContext, useContext} from 'react';
import {useRunningStats} from './useRunningStats';

export const RunningStatsContext = createContext<ReturnType<
  typeof useRunningStats
> | null>(null);

export const useRunningStatsContext = () => {
  const context = useContext(RunningStatsContext);
  if (!context) {
    throw new Error('RunningStatsContext가 없습니다');
  }
  return context;
};
