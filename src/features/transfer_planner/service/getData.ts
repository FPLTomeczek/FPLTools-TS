import { assignPositionsToPlayers, calculateSellingCost } from "./utils/index";
import { axiosInstance } from "../../../shared/utils/config/axiosConfig";
import {
  ManagerHistory,
  Pick,
  Transfer,
} from "../../../store_features/drafts/interfaces/drafts";
import { AppDispatch } from "../../../store/store";
import { PlayerHistory } from "../../../store_features/players/players";
import { setData } from "../../../store_features/drafts/draftsSlice";

interface APIPick {
  element: number;
  position: number;
  multiplier: number;
  is_captain: boolean;
  is_vice_captain: boolean;
}

export const getManagerData = async (
  id: number,
  dispatch: AppDispatch,
  playersHistory: PlayerHistory[],
  setError: React.Dispatch<
    React.SetStateAction<{
      value: boolean;
      msg: string;
    }>
  >,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let picks: Pick[];
  let managerHistory: ManagerHistory;
  let transfersHistory: Transfer[];
  setError({ value: false, msg: "" });

  try {
    picks = await getManagerTeam(id);
    managerHistory = await getManagerHistory(id);
    transfersHistory = await getTransfers(id);
  } catch (error) {
    setError({
      value: true,
      msg: `Error trying to fetch user data with id: ${id}`,
    });
    setIsLoading(false);
    return;
  }
  const playersSellCosts = calculateSellingCost(
    picks,
    transfersHistory,
    playersHistory
  );
  picks = picks.map((player: Pick, ind: number) => {
    return { ...player, sellCost: playersSellCosts[ind] };
  });
  dispatch(setData({ picks, managerHistory }));
  setIsLoading(false);
};

export const getManagerTeam = async (id: number) => {
  const { data: teamInfo } = await axiosInstance.get("/picks", {
    params: { userID: id },
  });

  if (Object.hasOwn(teamInfo, "msg")) throw new Error();

  const teamIDs = teamInfo.picks.map((pick: APIPick) => pick.element);
  const playersPositions = getPlayersPositions(teamInfo.picks);
  const teamPicks: Pick[] = await getTeamPicks(teamIDs);

  return assignPositionsToPlayers(playersPositions, teamPicks).sort(
    (a, b) => a.position - b.position
  );
};

export const getDemoManagerTeam = async (picks: APIPick[]) => {
  const teamIDs = picks.map((pick: APIPick) => pick.element);

  const playersPositions = getPlayersPositions(picks);

  const teamPicks: Pick[] = await getTeamPicks(teamIDs);

  return assignPositionsToPlayers(playersPositions, teamPicks).sort(
    (a, b) => a.position - b.position
  );
};

export const getManagerHistory = async (id: number) => {
  const { data } = await axiosInstance.get("/manager-history", {
    params: { userID: id },
  });

  return data;
};

export const getTransfers = async (id: number) => {
  const { data } = await axiosInstance.get("/transfers", {
    params: { userID: id },
  });

  return data;
};

export const getPlayersPositions = (picks: APIPick[]) => {
  const id_Position = picks.map((pick) => {
    const { position, element } = pick;
    return { position, element };
  });
  return id_Position;
};

export const getTeamPicks = async (teamIDs: number[]) => {
  const {
    data: { players: teamPicks },
  } = await axiosInstance.get(
    `/players/manager-picks?ids=[${teamIDs.map((id) => id)}]`
  );

  return teamPicks;
};
