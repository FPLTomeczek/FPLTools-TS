import PlayerPick from "./PlayerPick";
import styled from "styled-components";
import { splittingPicksByRoles } from "../utils";
import { PlayerPick as IPlayerPick } from "../interfaces/managerTeam";

const FirstEleven = ({ picks }: { picks: IPlayerPick[] }) => {
  const picksByRole = splittingPicksByRoles(picks);

  let playerIndex = 0;
  // <a href="https://www.vecteezy.com/free-vector/football-pitch">
  //   Football Pitch Vectors by Vecteezy
  // </a>;
  return (
    <Wrapper>
      <div className="pitch" data-testid="pitch">
        {picksByRole.map((players, ind) => {
          return (
            <div key={ind} className="picks-row">
              {players.map((player) => {
                return (
                  <PlayerPick
                    key={player.id}
                    player={player}
                    index={playerIndex++}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .pitch {
    background-image: url("src/assets/FOOTBALL_FIELD_portrait.jpg");
    width: 800px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .picks-row {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 2rem 0;
  }
`;

export default FirstEleven;
