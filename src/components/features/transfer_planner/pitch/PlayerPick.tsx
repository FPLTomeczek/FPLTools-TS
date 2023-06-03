import styled from "styled-components";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { useAppDispatch } from "../../../../app/hooks";
import {
  removePick,
  retrievePick,
  makeChange,
} from "../../../../features/managerTeam/managerTeamSlice";
import blank from "../../../../assets/shirts/blank.png";
import { teamsList } from "../list/data";
import { PlayerPick as IPlayerPick } from "../interfaces/managerTeam";

const PlayerPick = ({ player }: { player: IPlayerPick }) => {
  const {
    id,
    web_name: name,
    position,
    element_type,
    sellCost,
    now_cost: cost,
    team,
  } = player;

  const dispatch = useAppDispatch();

  const removePlayer = () => {
    dispatch(removePick({ id, position, element_type, sellCost, cost }));
  };

  const retrievePlayer = () => {
    dispatch(retrievePick(player.removedPickIndex));
  };

  const enableChange = () => {
    dispatch(makeChange(player.id));
  };

  const shirt = teamsList.find((teamItem) => teamItem.value === team)?.img;

  return (
    <Wrapper>
      <div className="player-pick">
        <div className="buttons">
          <button onClick={enableChange}>
            <ChangeCircleIcon color="warning" />
          </button>
          {name !== "Blank" ? (
            <button onClick={removePlayer}>
              <CancelIcon color="error" />
            </button>
          ) : (
            <button onClick={retrievePlayer}>
              <ArrowCircleLeftRoundedIcon color="success" />
            </button>
          )}
        </div>
        {shirt ? (
          <img src={shirt} alt="shirt" />
        ) : (
          <img src={blank} alt="default-shirt" />
        )}
        <p>{name}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    width: 50px;
  }
  .player-pick {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
  }
  .player-pick > i {
    font-size: 4rem;
  }
  .buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
  .buttons > * {
    cursor: pointer;
  }
  p {
    background-color: white;
    padding: 0.25rem;
  }
`;

export default PlayerPick;
