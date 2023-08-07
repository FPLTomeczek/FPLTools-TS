import { useAppDispatch } from "../../../../store/hooks";
import { Pick } from "../../../../store_features/drafts/interfaces/drafts";
import {
  makeChange,
  removePick,
  retrievePick,
} from "../../../../store_features/drafts/draftsSlice";

export const usePickActions = (pick: Pick) => {
  const { id, position, element_type, sellCost, now_cost: cost } = pick;

  const dispatch = useAppDispatch();

  const handleRemovePick = () => {
    dispatch(removePick({ id, position, element_type, sellCost, cost }));
  };

  const handleRetrievePick = () => {
    dispatch(retrievePick(position));
  };

  const handleMakeChange = () => {
    dispatch(makeChange(id));
  };

  return {
    handleRemovePick,
    handleRetrievePick,
    handleMakeChange,
  };
};
