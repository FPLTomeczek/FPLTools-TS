import styled from "styled-components";
import PlayerPick from "./PlayerPick";
import { PlayerPick as IPlayerPick } from "../interfaces/managerTeam";

const Bench = ({ picks }: { picks: IPlayerPick[] }) => {
  let playerStartIndex = 11;

  if (picks.length === 0) {
    return;
  }

  return (
    <Wrapper>
      {picks.map((player) => {
        return (
          <PlayerPick
            key={player.position}
            player={player}
            index={playerStartIndex++}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(114, 207, 159, 0.9);
  padding: 1rem 2rem;
`;
export default Bench;
