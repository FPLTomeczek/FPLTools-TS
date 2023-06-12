import PlayerPick from "./PlayerPick";
import styled from "styled-components";
import { splittingPicksByRoles } from "../utils";
import { PlayerPick as IPlayerPick } from "../interfaces/managerTeam";
import pitch_image from "../../../../assets/FOOTBALL_FIELD_portrait.jpg";

const FirstEleven = ({ picks }: { picks: IPlayerPick[] }) => {
  const picksByRole = splittingPicksByRoles(picks);

  let playerIndex = 0;
  // <a href="https://www.vecteezy.com/free-vector/football-pitch">
  //   Football Pitch Vectors by Vecteezy
  // </a>;
  return (
    <Wrapper>
      <div
        className="pitch"
        style={{
          backgroundImage: `url(${pitch_image})`,
        }}
        data-testid="pitch"
      >
        {picksByRole.map((players, ind) => {
          return (
            <div key={ind} className="picks-row">
              {players.map((player) => {
                return (
                  <PlayerPick
                    key={player.position}
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
  .picks-row > * {
    flex: 1;
  }

  @media screen and (max-width: 480px) {
    .pitch {
      width: 100vw;
      background-size: 100% 100%;
    }
  }
`;

export default FirstEleven;
