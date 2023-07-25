import { FixtureItem } from "./Fixtures.styled";

const SingleFutureFixture = ({
  opponent,
  isHome,
  difficulty,
}: {
  opponent: string;
  isHome: boolean;
  difficulty: number;
}) => {
  return (
    <FixtureItem isHome={isHome} difficulty={difficulty}>
      {opponent}
    </FixtureItem>
  );
};

export default SingleFutureFixture;
