import { useAppSelector } from "../../../../store/hooks.ts";
import PlayersListFilters from "./filters/PlayersListFilters.tsx";
import ListButtons from "./buttons/ListButtons.tsx";
import PlayerListItems from "./PlayerListItems.tsx";
import { PlayersListStyled } from "./PlayersList.styled.ts";
import Loading from "../../../../shared/ui/Loading/Loading.tsx";
import { useListPages } from "../hooks/useListPages.tsx";

const PlayersList = () => {
  const playersStatus = useAppSelector((state) => state.players.status);
  const { page, numOfPages, pagesData, handleSetPage, handleSortChange } =
    useListPages();

  if (playersStatus === "loading") {
    return <Loading />;
  }

  if (playersStatus === "error") {
    return <p>Error</p>;
  }

  if (playersStatus === "idle") {
    return <p>Idle</p>;
  }

  return (
    <PlayersListStyled>
      <PlayersListFilters
        handleSetPage={handleSetPage}
        page={page}
        numOfPages={numOfPages}
      />
      <PlayerListItems
        pagesData={pagesData}
        page={page}
        handleSortChange={handleSortChange}
      />
      <ListButtons
        handleSetPage={handleSetPage}
        page={page}
        numOfPages={numOfPages}
      />
    </PlayersListStyled>
  );
};

export default PlayersList;
