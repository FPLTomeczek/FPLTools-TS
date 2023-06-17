import { setBackgroundColor } from "./utils";
import styled from "styled-components";

interface FixtureItemProps {
  isHome: boolean;
  difficulty: number;
}

export const FixtureItem = styled.p<FixtureItemProps>`
  text-transform: ${(props) => (props.isHome ? "none" : "lowercase")};
  background-color: ${(props) =>
    props.isHome
      ? setBackgroundColor(props.difficulty)
      : setBackgroundColor(props.difficulty)};
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
