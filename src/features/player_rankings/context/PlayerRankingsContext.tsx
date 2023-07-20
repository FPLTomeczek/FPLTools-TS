import { createContext, useState } from "react";

import { PlayerRankingsFilters } from "../../../store_features/players/players";
interface PlayerRankingsContext {
  filters: PlayerRankingsFilters;
  filter: (playerRankingsFilters: PlayerRankingsFilters) => void;
  listCount: number;
  updateListCount: (reset: boolean, value: number) => void;
}

export const PlayerRankingsContext = createContext<PlayerRankingsContext>({
  filters: {
    name: "",
    team: "ALL",
    role: "ALL",
    probability: "scores",
    price: 0,
  },
  filter: () => {
    // function init
  },
  listCount: 10,
  updateListCount: () => {
    // function init
  },
});

const PlayerRankingsProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [filters, setfilters] = useState<PlayerRankingsFilters>({
    name: "",
    team: "ALL",
    role: "ALL",
    probability: "Score",
    price: 0,
  });

  const [listCount, setlistCount] = useState(10);

  const filter = (playerRankingsFilters: PlayerRankingsFilters) => {
    setfilters(playerRankingsFilters);
  };

  const updateListCount = (reset: boolean, value: number) => {
    reset ? setlistCount(value) : setlistCount((prev) => prev + value);
  };

  const playerRankingsContext: PlayerRankingsContext = {
    filters,
    filter,
    listCount,
    updateListCount,
  };

  return (
    <PlayerRankingsContext.Provider value={playerRankingsContext}>
      {children}
    </PlayerRankingsContext.Provider>
  );
};

export default PlayerRankingsProvider;
