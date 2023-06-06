import PlayerPick from "./PlayerPick";
import styled from "styled-components";
import { roleToIndex } from "../utils";
import { PlayerPick as IPlayerPick } from "../interfaces/managerTeam";

const FirstEleven = ({ picks }: { picks: IPlayerPick[] }) => {
  const picksByRole = picks.reduce(
    (accumulator: Array<Array<IPlayerPick>>, value: IPlayerPick) => {
      const index = roleToIndex(value.element_type);
      if (typeof index !== "undefined") {
        if (accumulator[index] === undefined) {
          accumulator[index] = [value];
        } else {
          accumulator[index] = [...accumulator[index], value];
        }
      }
      return accumulator;
    },
    []
  );

  // <a href="https://www.vecteezy.com/free-vector/football-pitch">
  //   Football Pitch Vectors by Vecteezy
  // </a>;
  return (
    <Wrapper>
      <div className="pitch">
        {picksByRole.map((players, ind) => {
          return (
            <div key={ind} className="picks-row">
              {players.map((player) => {
                return <PlayerPick key={player.id} player={player} />;
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
