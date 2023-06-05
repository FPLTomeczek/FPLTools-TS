import { setBackgroundColor } from "./utils";

type FixtureProps = {
  opponent: string;
  isHome: boolean;
  difficulty: number;
};

const FutureFixture = ({ opponent, isHome, difficulty }: FixtureProps) => {
  const bgColor = setBackgroundColor(difficulty);

  return (
    <p
      style={{
        textTransform: isHome ? "none" : "lowercase",
        backgroundColor: bgColor,
        fontWeight: "700",
        width: "20px",
        boxSizing: "border-box",
        textAlign: "center",
        padding: "0.25rem 0",
        maxHeight: "16px",
      }}
    >
      {opponent}
    </p>
  );
};

export default FutureFixture;
