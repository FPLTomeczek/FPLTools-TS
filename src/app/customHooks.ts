import { useAppSelector } from "./hooks";

export const useDraft = () => {
  return useAppSelector(
    (state) => state.drafts?.managerTeam[state.drafts.draftNumber]
  );
};
