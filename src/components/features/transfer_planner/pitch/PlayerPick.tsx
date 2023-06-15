import styled from "styled-components";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { useAppDispatch } from "../../../../app/hooks";
import {
  removePick,
  retrievePick,
  makeChange,
} from "../../../../features/drafts/draftsSlice";
import blank from "../../../../assets/shirts/blank.png";
import { teamsList } from "../list/data";
import { isEmpty } from "lodash";
import { PlayerPick as IPlayerPick } from "../interfaces/drafts";
import FutureFixtures from "../fixtures/FutureFixtures";
import NextFixture from "../fixtures/NextFixture";
import { useDraft } from "../../../../app/customHooks";

const PlayerPick = ({
  player,
  index,
}: {
  player: IPlayerPick;
  index: number;
}) => {
  const {
    id,
    web_name: name,
    position,
    element_type,
    sellCost,
    now_cost: cost,
    team,
  } = player;

  const playerToChange = useDraft("playerToChange");
  const dispatch = useAppDispatch();

  const removePlayer = () => {
    dispatch(removePick({ id, position, element_type, sellCost, cost }));
  };

  const retrievePlayer = () => {
    dispatch(retrievePick(position));
  };

  const enableChange = () => {
    dispatch(makeChange(id));
  };

  const shirt = teamsList.find((teamItem) => teamItem.value === team)?.img;

  return (
    <Wrapper>
      <div className="player-pick">
        <div className="buttons">
          {name !== "Blank" ? (
            <div className="manipulate-player-buttons">
              <button
                data-testid={`change-button-${index}`}
                onClick={enableChange}
              >
                <ChangeCircleIcon color="warning" />
              </button>
              <button onClick={removePlayer}>
                <CancelIcon color="error" />
              </button>
            </div>
          ) : (
            <button onClick={retrievePlayer}>
              <ArrowCircleLeftRoundedIcon color="action" />
            </button>
          )}
        </div>
        {shirt ? (
          <img
            src={shirt}
            alt="shirt"
            className={`player-shirt ${
              !isEmpty(playerToChange) && playerToChange.id === id
                ? "change-pick"
                : ""
            }`}
          />
        ) : (
          <img src={blank} alt="default-shirt" className="player-shirt" />
        )}

        <NextFixture
          team={team}
          sellCost={typeof sellCost === "undefined" ? cost : sellCost}
          index={index}
        />
        <FutureFixtures team={team} />
        <p className="player-pick-text" data-testid={`player-name-${index}`}>
          {name}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .player-pick {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
  }
  .player-pick-text {
    min-width: 100px;
    box-sizing: border-box;
    text-align: center;
    background-color: white;
    padding: 0.25rem;
    margin: 2px 0;
  }
  .player-pick > i {
    font-size: 4rem;
  }
  .change-pick {
    background-color: yellow;
  }
  .manipulate-player-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
  button {
    cursor: pointer;
  }
  .player-pick-price {
    position: absolute;
    right: 0;
    top: -15px;
    background-color: var(--light-green);
    font-size: 0.8rem;
  }
  #player-pick-next-fixture {
    position: relative;
  }
  .bench-price {
    background-color: var(--secondary-color);
  }

  @media screen and (max-width: 480px) {
    .player-pick-text {
      font-size: 0.75rem;
      max-width: 100px;
      min-width: auto;
    }
  }
`;

export default PlayerPick;
