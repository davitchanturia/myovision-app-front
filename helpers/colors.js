export const contourColor = (color) => {
  switch (color) {
    case -1:
      return { red: 255, green: 0, blue: 0 };
    case 1:
      return { red: 0, green: 255, blue: 0 };
    case 2:
      return { red: 0, green: 0, blue: 255 };
    case 0:
      return { red: 128, green: 128, blue: 128 };
    default:
      return { red: 255, green: 0, blue: 0 };
  }
};
