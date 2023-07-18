import styled from "styled-components";

import { setFixtureBackgroundColor } from "../../utils";

interface FixtureItemProps {
  isHome: boolean;
  difficulty: number;
}

export const FixtureItem = styled.p<FixtureItemProps>`
  text-transform: ${(props) => (props.isHome ? "none" : "lowercase")};
  background-color: ${(props) =>
    props.isHome
      ? setFixtureBackgroundColor(props.difficulty)
      : setFixtureBackgroundColor(props.difficulty)};
  font-weight: 700;
  width: 20px;
  box-sizing: border-box;
  text-align: center;
  padding: 0.1rem 0;
  max-height: 16px;
  margin: 0;

  @media screen and (max-width: 480px) {
    width: auto;
    padding: 0.25rem 0.5px;
  }
`;

export const FutureFixturesStyled = styled.div`
  display: flex;
  font-size: 0.5rem;
  width: 100px;
  @media screen and (max-width: 480px) {
    max-width: 100px;
    width: auto;
  }
`;
