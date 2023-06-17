import styled from "styled-components";
import { setBackgroundColor } from "./utils";

type FixtureProps = {
  opponent: string;
  isHome: boolean;
  difficulty: number;
};

const FutureFixture = ({ opponent, isHome, difficulty }: FixtureProps) => {
  const bgColor = setBackgroundColor(difficulty);

  return (
    <Wrapper>
      <p
        id="single-fixture"
        style={{
          textTransform: isHome ? "none" : "lowercase",
          backgroundColor: bgColor,
        }}
      >
        {opponent}
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  #single-fixture {
    font-weight: 700;
    width: 20px;
    box-sizing: border-box;
    text-align: center;
    padding: 0.1rem 0;
    max-height: 16px;
    margin: 0;
  }
  @media screen and (max-width: 480px) {
    #single-fixture {
      max-width: none;
      width: auto;
      padding: 0.25rem 0.5px;
    }
  }
`;

export default FutureFixture;
