import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Pick } from "../../../../store_features/drafts/interfaces/drafts";
import SingleGameweekTransfer from "./SingleGameweekTransfer";
import { useAppDispatch } from "../../../../store/hooks";
import { updateGameweeks } from "../../../../store_features/drafts/draftsSlice";
import { GameweekTransfersStyled } from "./GameweekTransfersSummary.styled";
import { useDraft } from "../../../../store/customHooks";
import { DirectionButton } from "../../../../shared/ui/Buttons/DirectionButton";

const GameweekTransfers = ({
  removedPicks,
  addedPicks,
  gameweek,
}: {
  removedPicks: Pick[];
  addedPicks: Pick[];
  gameweek: number;
}) => {
  const dispatch = useAppDispatch();

  const setGameweek = (gameweek: number) => {
    document
      .querySelector(".pitch-playerlist-container")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    dispatch(updateGameweeks(gameweek));
  };

  const currentChip = useDraft().dataByGameweeks[gameweek].chipByGameweek;

  return (
    <GameweekTransfersStyled>
      <div className="gameweek-transfers-header">
        <h2>GW: {gameweek}</h2>
        <DirectionButton onClick={() => setGameweek(gameweek)}>
          <KeyboardArrowUpIcon />
        </DirectionButton>
      </div>
      {currentChip ? <h3>Chip played: {currentChip}</h3> : null}
      <div className="gameweek-transfers-picks">
        <div className="removed-picks">
          <span id="picks-out" className="picks-transfer-status">
            out
          </span>
          {removedPicks.map((removedPick) => {
            return (
              <SingleGameweekTransfer pick={removedPick} key={removedPick.id} />
            );
          })}
        </div>
        <div className="added-picks">
          <span id="picks-in" className="picks-transfer-status">
            in
          </span>
          {addedPicks.map((addedPick) => {
            return (
              <SingleGameweekTransfer pick={addedPick} key={addedPick.id} />
            );
          })}
        </div>
      </div>
    </GameweekTransfersStyled>
  );
};

export default GameweekTransfers;
