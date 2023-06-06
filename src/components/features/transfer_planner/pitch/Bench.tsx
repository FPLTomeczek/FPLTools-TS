import styled from "styled-components";
import PlayerPick from "./PlayerPick";
import { PlayerPick as IPlayerPick } from "../interfaces/managerTeam";

const Bench = ({ picks }: { picks: IPlayerPick[] }) => {
  let playerStartIndex = 11;
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
  margin-top: 1rem;
`;
export default Bench;
