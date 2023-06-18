import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { paginate, filterPlayers, sortPlayers } from "./utils";
import { sortPlayers as sortPlayersSlice } from "../../../store_features/players/playersSlice";
import PlayersListForm from "./PlayersListFilters.tsx";
import ListButtons from "../direction_buttons/ListButtons.tsx";
import PlayerListItems from "./PlayerListItems";
import { SortOptions, Player } from "../interfaces/players.ts";
import { PlayersListStyled } from "./List.styled.ts";
import Loading from "../../../components/Loading.tsx";

const PlayersList = () => {
  const players = useAppSelector((state) => state.players.playersList);
  const status = useAppSelector((state) => state.players.status);
  const filters = useAppSelector((state) => state.players.filterOptions);
  const sortOptions = useAppSelector((state) => state.players.sortOptions);

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const {
    pagesData,
    numOfPages,
  }: { pagesData: Array<Array<Player>>; numOfPages: number } = paginate(
    sortPlayers(filterPlayers(players, filters), sortOptions)
  );

  const handleSortChange = (sortOptions: SortOptions) => {
    dispatch(sortPlayersSlice({ ...sortOptions }));
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <p>Error</p>;
  }

  if (status === "idle") {
    return <p>Idle</p>;
  }

  return (
    <PlayersListStyled>
      <PlayersListForm setPage={setPage} page={page} numOfPages={numOfPages} />
      <PlayerListItems
        pagesData={pagesData}
        page={page}
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
      <ListButtons setPage={setPage} numOfPages={numOfPages} page={page} />
    </PlayersListStyled>
  );
};

export default PlayersList;
