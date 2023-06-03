import styled from "styled-components";
import PlayerPick from "./PlayerPick";
import { PlayerPick as IPlayerPick } from "../interfaces/managerTeam";

const Bench = ({ picks }: { picks: IPlayerPick[] }) => {
  return (
    <Wrapper>
      {picks.map((player) => {
        return <PlayerPick key={player.position} player={player} />;
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
