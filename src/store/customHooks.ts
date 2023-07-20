import { useAppSelector } from "./hooks";

export const useDraft = () => {
  return useAppSelector(
    (state) => state.drafts?.managerTeam[state.drafts.draftNumber]
  );
};

export const useThisGameweekData = () => {
  const gameweek = useDraft().gameweek;
  return useDraft().dataByGameweeks[gameweek];
};
