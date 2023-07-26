import { Range } from "../../../../shared/utils/types/range";
import { FixtureItem } from "./Fixtures.styled";

const SingleFutureFixture = ({
  opponent,
  isHome,
  difficulty,
}: {
  opponent: string;
  isHome: boolean;
  difficulty: Range<2, 6>;
}) => {
  return (
    <FixtureItem
      data-testid="single-fixture-item"
      isHome={isHome}
      difficulty={difficulty}
    >
      {opponent}
    </FixtureItem>
  );
};

export default SingleFutureFixture;
