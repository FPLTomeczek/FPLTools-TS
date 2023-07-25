import { createContext, useState } from "react";

import { PlayerRankingsFilters } from "../../../store_features/players/players";
interface PlayerRankingsContext {
  filters: PlayerRankingsFilters;
  filter: (playerRankingsFilters: PlayerRankingsFilters) => void;
  listCount: number;
  updateListCount: (reset: boolean, value: number) => void;
}

const DEFAULT_MAX_PRICE = 150;

export const PlayerRankingsContext = createContext<PlayerRankingsContext>({
  filters: {
    name: "",
    team: "ALL",
    role: "ALL",
    probability: "scores",
    price: DEFAULT_MAX_PRICE,
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
    price: DEFAULT_MAX_PRICE,
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
