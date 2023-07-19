export function setFixtureBackgroundColor(difficulty: number) {
  switch (difficulty) {
    case 2:
      return "#b0ff73";
    case 3:
      return "#FFFFFF";
    case 4:
      return "#ff6303";
    case 5:
      return "#ff0000";
    default:
      break;
  }
}
