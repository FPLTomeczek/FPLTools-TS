import React from "react";
import { styled } from "styled-components";
import PlayerPick from "./PlayerPick";

const Bench = ({ picks }) => {
  let index = 11;
  return (
    <Wrapper>
      {picks.map((player) => {
        return (
          <PlayerPick key={player.position} player={player} index={index++} />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
export default Bench;
