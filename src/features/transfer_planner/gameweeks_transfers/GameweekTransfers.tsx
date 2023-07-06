import { Pick } from "../interfaces/drafts";
import SingleGameweekTransfer from "./SingleGameweekTransfer";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppDispatch } from "../../../app/hooks";
import { updateGameweeks } from "../../../store_features/drafts/draftsSlice";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(updateGameweeks(gameweek));
  };

  return (
    <Wrapper>
      <div className="gameweek-transfers-header">
        <h2>GW: {gameweek}</h2>
        <button
          className="direction-button"
          onClick={() => setGameweek(gameweek)}
        >
          <KeyboardArrowUpIcon />
        </button>
      </div>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  border: 2px solid var(--secondary-color);
  border-radius: var(--primary-border-radius);
  height: fit-content;
  .gameweek-transfers-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .gameweek-transfers-picks {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .picks-transfer-status {
    padding: 0.5rem;
    color: white;
    text-transform: capitalize;
    display: block;
    max-width: 30px;
    text-align: center;
    border-radius: var(--primary-border-radius);
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  #picks-in {
    background-color: var(--light-green);
  }
  #picks-out {
    background-color: var(--warning-color);
  }
  @media screen and (max-width: 800px) {
    padding: 1rem;
  }
`;

export default GameweekTransfers;
