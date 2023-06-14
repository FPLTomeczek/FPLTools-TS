import { assignPositionsToPlayers } from "./utils";

import { axiosInstance } from "../../../utils";

import { PlayerPick } from "./interfaces/drafts";
interface APIPick {
  element: number;
  position: 1;
  multiplier: 1;
  is_captain: false;
  is_vice_captain: false;
}

export const getManagerTeam = async (id: number) => {
  const { data: teamInfo } = await axiosInstance.get("/team", {
    params: { userID: id },
  });

  const teamIDs = teamInfo.picks.map((pick: APIPick) => pick.element);

  const playersPositions = getPlayersPositions(teamInfo.picks);

  const teamPicks: PlayerPick[] = await getTeamPicks(teamIDs);

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
    `/players/getTeamManagerPlayers?ids=[${teamIDs.map((id) => id)}]`
  );

  return teamPicks;
};
