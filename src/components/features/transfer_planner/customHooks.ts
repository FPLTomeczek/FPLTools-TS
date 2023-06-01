import { assignPositionsToPlayers } from "./utils";

import { axiosInstance } from "../../../utils";

export const getManagerTeam = async (id) => {
  const { data: teamInfo } = await axiosInstance.get("/team", {
    params: { userID: id },
  });
  const teamIDs = teamInfo.picks.map((pick) => pick.element);

  const playersPositions = getPlayersPositions(teamInfo);

  const teamPicks = await getTeamPicks(teamIDs);

  return assignPositionsToPlayers(playersPositions, teamPicks).sort(
    (a, b) => a.position - b.position
  );
};

export const getManagerHistory = async (id) => {
  const { data } = await axiosInstance.get("/manager-history", {
    params: { userID: id },
  });

  return data;
};

export const getTransfers = async (id) => {
  const { data } = await axiosInstance.get("/transfers", {
    params: { userID: id },
  });

  return data;
};

export const getPlayersPositions = (teamData) => {
  const id_Position = teamData.picks.map((pick) => {
    const { position, element } = pick;
    return { position, element };
  });
  return id_Position;
};

export const getTeamPicks = async (teamIDs) => {
  const {
    data: { players: teamPicks },
  } = await axiosInstance.get(
    `/players/getTeamManagerPlayers?ids=[${teamIDs.map((id) => id)}]`
  );
  return teamPicks;
};
