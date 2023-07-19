import { useContext, useEffect } from "react";

import { DialogFilter } from "../../../../features/player_rankings/enums/playerRankingsEnums";
import DialogProbability from "./DialogProbability";
import DialogTeam from "./DialogTeam";
import DialogRole from "./DialogRole";
import DialogPrice from "./DialogPrice";
import { useAppSelector } from "../../../../store/hooks";
import { PlayerRankingsContext } from "../../../../features/player_rankings/context/PlayerRankingsContext";

const DialogInputs = ({
  dialogFilter,
}: {
  dialogFilter: DialogFilter | undefined;
}) => {
  const { filters, filter } = useContext(PlayerRankingsContext);

  const players = useAppSelector((state) => state.players.playersList);
  const playerPriceMax = Math.max(...players.map((player) => player.now_cost));

  useEffect(() => {
    filter({
      ...filters,
      price: playerPriceMax,
    });
  }, [playerPriceMax]);

  if (dialogFilter === DialogFilter.PROBABILITY) {
    return <DialogProbability dialogFilter={dialogFilter} />;
  } else if (dialogFilter === DialogFilter.TEAM) {
    return <DialogTeam dialogFilter={dialogFilter} />;
  } else if (dialogFilter === DialogFilter.ROLE) {
    return <DialogRole dialogFilter={dialogFilter} />;
  } else if (dialogFilter === DialogFilter.PRICE) {
    return <DialogPrice maxPrice={playerPriceMax} />;
  }
  return <div>No data found</div>;
};

export default DialogInputs;
