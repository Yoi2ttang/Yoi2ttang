'use client';

import {ReactNode} from 'react';
import {useRunningStats} from '../../hooks/useRunningStats';
import {RunningStatsContext} from '../../hooks/useRunningStatsContext';
// import useProfileForEdit from "@/hooks/profile/useProfileForEdit"

interface RunningStatsProviderProps {
  children: ReactNode;
  isPaused: boolean;
}

export const RunningStatsProvider = ({
  children,
  isPaused,
}: RunningStatsProviderProps) => {
  //   const { data } = useProfileForEdit()
  const stats = useRunningStats({isPaused, weight: 52});

  return (
    <RunningStatsContext.Provider value={stats}>
      {children}
    </RunningStatsContext.Provider>
  );
};
