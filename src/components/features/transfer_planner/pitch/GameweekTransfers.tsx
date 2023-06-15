import { PlayerPick } from "../interfaces/drafts";
import SingleGameweekTransfer from "./SingleGameweekTransfer";
import styled from "styled-components";

const GameweekTransfers = ({
  removedPicks,
  addedPicks,
  gameweek,
}: {
  removedPicks: PlayerPick[];
  addedPicks: PlayerPick[];
  gameweek: number;
}) => {
  return (
    <Wrapper>
      <h2>GW: {gameweek}</h2>
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
  padding: 1rem;
  border: 2px solid var(--secondary-color);
  border-radius: var(--primary-border-radius);
  .gameweek-transfers-picks {
    display: flex;
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
`;

export default GameweekTransfers;
