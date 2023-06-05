type FixtureProps = {
  opponent: string;
  isHome: boolean;
  difficulty: number;
};

function setBackgroundColor(difficulty: number) {
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

const FutureFixture = ({ opponent, isHome, difficulty }: FixtureProps) => {
  const bgColor = setBackgroundColor(difficulty);

  return (
    <p
      style={{
        textTransform: isHome ? "none" : "lowercase",
        backgroundColor: bgColor,
        fontWeight: "700",
      }}
    >
      {opponent}
    </p>
  );
};

export default FutureFixture;
