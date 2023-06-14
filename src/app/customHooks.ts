import { useAppSelector } from "./hooks";
import { ManagerTeamState } from "../features/drafts/initializers";

export const useDraft = <K extends keyof ManagerTeamState>(key: K) => {
  //handle no key
  return useAppSelector(
    (state) => state.drafts?.managerTeam[state.drafts.draftNumber][key]
  );
};
