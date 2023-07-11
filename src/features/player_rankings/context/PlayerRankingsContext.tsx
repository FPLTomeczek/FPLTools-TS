import { createContext, useState } from "react";
import { PlayerRankingsFilters } from "../../../interfaces/players";

interface PlayerRankingsContext {
  playersRankingsFilters: PlayerRankingsFilters;
  filterPlayerRankings: (playerRankingsFilters: PlayerRankingsFilters) => void;
}

export const PlayerRankingsContext = createContext<PlayerRankingsContext>({
  playersRankingsFilters: {
    name: "",
    team: "ALL",
    role: "ALL",
    probability: "scores",
    price: 0,
  },
  filterPlayerRankings: () => {
    // function initializer
  },
});

const PlayerRankingsProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [playersRankingsFilters, setPlayersRankingsFilters] =
    useState<PlayerRankingsFilters>({
      name: "",
      team: "ALL",
      role: "ALL",
      probability: "Score",
      price: 0,
    });

  const filterPlayerRankings = (
    playerRankingsFilters: PlayerRankingsFilters
  ) => {
    setPlayersRankingsFilters(playerRankingsFilters);
  };

  const playerRankingsContext: PlayerRankingsContext = {
    playersRankingsFilters,
    filterPlayerRankings,
  };

  return (
    <PlayerRankingsContext.Provider value={playerRankingsContext}>
      {children}
    </PlayerRankingsContext.Provider>
  );
};

export default PlayerRankingsProvider;
