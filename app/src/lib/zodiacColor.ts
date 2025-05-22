export const getColorByZodiacId = (zodiacId: number): string => {
  const colorMap: {[key: number]: string} = {
    1: '#bebebe',
    2: '#e2be8d',
    3: '#ffb950',
    4: '#ac2fd7',
    5: '#88bfa7',
    6: '#4f93d2',
    7: '#ad6b23',
    8: '#f2e7d6',
    9: '#f2cc4d',
    10: '#ef3a5d',
    11: '#9d9d9d',
    12: '#f5b8c3',
  };

  return colorMap[zodiacId] || '#FFFFFF';
};
