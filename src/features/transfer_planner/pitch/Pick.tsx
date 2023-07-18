import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { isEmpty } from "lodash";

import { useAppDispatch } from "../../../app/hooks";
import {
  removePick,
  retrievePick,
  makeChange,
} from "../../../store_features/drafts/draftsSlice";
import blank from "../../../assets/shirts/blank.png";
import { TEAMS_LIST } from "../../../data";
import { Pick as IPick } from "../../../interfaces/drafts";
import FutureFixtures from "../fixtures/FutureFixtures";
import NextFixture from "../fixtures/NextFixture";
import { useDraft } from "../../../app/customHooks";
import { PickStyled } from "./Pitch.styled";

const Pick = ({ player, index }: { player: IPick; index: number }) => {
  const {
    id,
    web_name: name,
    position,
    element_type,
    sellCost,
    now_cost: cost,
    team,
  } = player;

  const pickToChange = useDraft().pickToChange;
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

  const shirt = TEAMS_LIST.find((teamItem) => teamItem.name === team)?.img;

  return (
    <PickStyled>
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
              !isEmpty(pickToChange) && pickToChange.id === id
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
    </PickStyled>
  );
};

export default Pick;
