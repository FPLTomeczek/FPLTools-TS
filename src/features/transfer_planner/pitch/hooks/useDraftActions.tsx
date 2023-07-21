import { useAppDispatch } from "../../../../store/hooks";
import { updateDraftNumber } from "../../../../store_features/drafts/draftsSlice";

export const useDraftActions = () => {
  const dispatch = useAppDispatch();

  const handleDraftChange = (draftNumber: number) => {
    dispatch(updateDraftNumber(draftNumber));
  };
  return {
    handleDraftChange,
  };
};
