import { FixtureItem } from "./Fixture.styled";

type FixtureProps = {
  opponent: string;

  isHome: boolean;
  difficulty: number;
};

const FutureFixture = ({ opponent, isHome, difficulty }: FixtureProps) => {
  return (
    <FixtureItem isHome={isHome} difficulty={difficulty}>
      {opponent}{" "}
    </FixtureItem>
  );
};

export default FutureFixture;
