import { useAppSelector } from "./hooks";
import { ManagerTeamState } from "../store_features/drafts/initializers";

export const useDraft = <K extends keyof ManagerTeamState>(key: K) => {
  return useAppSelector(
    (state) => state.drafts?.managerTeam[state.drafts.draftNumber][key]
  );
};
