export const getMarkerIconByZodiacId = (zodiacId: number) => {
  switch (zodiacId) {
    case 1:
      return require('../assets/animals/mouse-icon.svg');
    case 2:
      return require('../assets/animals/cow-icon.svg');
    case 3:
      return require('../assets/animals/tiger-icon.svg');
    case 4:
      return require('../assets/animals/rabbit-icon.svg');
    case 5:
      return require('../assets/animals/dragon-icon.svg');
    case 6:
      return require('../assets/animals/snake-icon.svg');
    case 7:
      return require('../assets/animals/horse-icon.svg');
    case 8:
      return require('../assets/animals/sheep-icon.svg');
    case 9:
      return require('../assets/animals/monkey-icon.svg');
    case 10:
      return require('../assets/animals/chicken-icon.svg');
    case 11:
      return require('../assets/animals/dog-icon.svg');
    case 12:
      return require('../assets/animals/pig-icon.svg');
    default:
      return require('../assets/animals/snake-icon.svg');
  }
};
