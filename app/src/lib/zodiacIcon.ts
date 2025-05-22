export const getZodiacImage = (zodiacId: number) => {
  switch (zodiacId) {
    case 1:
      return require('../assets/animals/mouse-icon.png');
    case 2:
      return require('../assets/animals/cow-icon.png');
    case 3:
      return require('../assets/animals/tiger-icon.png');
    case 4:
      return require('../assets/animals/rabbit-icon.png');
    case 5:
      return require('../assets/animals/dragon-icon.png');
    case 6:
      return require('../assets/animals/snake-icon.png');
    case 7:
      return require('../assets/animals/horse-icon.png');
    case 8:
      return require('../assets/animals/sheep-icon.png');
    case 9:
      return require('../assets/animals/monkey-icon.png');
    case 10:
      return require('../assets/animals/chicken-icon.png');
    case 11:
      return require('../assets/animals/dog-icon.png');
    case 12:
      return require('../assets/animals/pig-icon.png');
    default:
      return require('../assets/animals/snake-icon.png');
  }
};
