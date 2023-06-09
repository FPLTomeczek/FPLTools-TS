import { useAppSelector } from "../../app/hooks";
import { useContext } from "react";
import { PlayerRankingsContext } from "./context/PlayerRankingsContext";
import { filterPlayers } from "../../utils/filterPlayersUtils";
import { PlayerRankingsListStyled } from "./PlayerRankings.styled";
import { Player } from "../../interfaces/players";

const PlayerRankingsList = () => {
  const players = useAppSelector((state) => state.players.playersList);

  const { filters, listCount, updateListCount } = useContext(
    PlayerRankingsContext
  );

  const filteredPlayers = filters ? filterPlayers(players, filters) : players;

  const listPlayers = filteredPlayers
    .slice()
    .sort((playerA, playerB) => playerB.scoring_chance - playerA.scoring_chance)
    .slice(0, listCount);

  const handleLoadingNewPlayers = () => {
    if (
      filteredPlayers.length - listCount < 10 &&
      filteredPlayers.length > listCount
    ) {
      updateListCount(false, filteredPlayers.length - listCount);
    } else if (filteredPlayers.length === listCount) {
      return;
    } else {
      updateListCount(false, 10);
    }
  };

  return (
    <PlayerRankingsListStyled>
      {listPlayers.map((player) => {
        return <PlayerRankingListItem player={player} key={player.id} />;
      })}
      <button className="btn-primary" onClick={handleLoadingNewPlayers}>
        Load More
      </button>
    </PlayerRankingsListStyled>
  );
};

const PlayerRankingListItem = ({ player }: { player: Player }) => {
  const { web_name, scoring_chance } = player;

  return (
    <div className="player-ranking-item">
      <div className="player-ranking-item-desc">
        <p>{web_name}</p>
      </div>
      <div className="player-ranking-item-probability">
        <div className="probability-bar">
          <div
            style={{
              width: `${scoring_chance}%`,
              height: "inherit",
              backgroundColor: `rgba(
                    ${255 - (scoring_chance * 255) / 100},
                    ${(scoring_chance * 255) / 100},
                    0,1 )`,
            }}
          ></div>
          <span className="player-scoring-chance">{scoring_chance}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerRankingsList;
