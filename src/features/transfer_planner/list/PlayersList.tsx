import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import styled from "styled-components";
import { paginate, filterPlayers, sortPlayers } from "./utils";
import { sortPlayers as sortPlayersSlice } from "../../../store_features/players/playersSlice";
import PlayersListForm from "./PlayersListForm.tsx";
import ListButtons from "../buttons/ListButtons.tsx";
import PlayerListItems from "./PlayerListItems";
import { SortOptions, Player } from "../interfaces/players.ts";
import { CircularProgress } from "@mui/material";

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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "var(--secondary-color)" }} />
      </div>
    );
  }

  if (status === "error") {
    return <p>Error</p>;
  }

  if (status === "idle") {
    return <p>Idle</p>;
  }

  return (
    <Wrapper>
      <PlayersListForm setPage={setPage} page={page} numOfPages={numOfPages} />
      <PlayerListItems
        pagesData={pagesData}
        page={page}
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
      <ListButtons setPage={setPage} numOfPages={numOfPages} page={page} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;

  .player-list-item,
  .player-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: clamp(0.75rem, calc(0.24rem + 2.35vw), 1rem);
  }
  .player-list-item {
    border-top: 1px solid gray;
  }
  .player-list-number {
    min-width: 12%;
  }
  .player-list-name {
    min-width: 35%;
  }
  .player-add-button-color {
    display: flex;
    align-items: center;
    justify-content: space-around;

    min-width: 15%;
  }

  .player-list-number {
    display: flex;
    align-items: center;
  }
  #player-list-points,
  #player-list-price {
    cursor: pointer;
  }

  .team-color {
    width: 20px;
    border-radius: 50%;
    background-color: black;
    height: 20px;
  }
  @media screen and (max-width: 1400px) {
    padding: 1rem 4rem;
  }
  @media screen and (max-width: 800px) {
    padding: 1rem;
  }
`;

export default PlayersList;
