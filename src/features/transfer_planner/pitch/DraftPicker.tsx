import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateDraftNumber } from "../../../store_features/drafts/draftsSlice";
import { DraftPickerStyled } from "./Pitch.styled";

const DraftPicker = () => {
  const draftNumber = useAppSelector((state) => state.drafts.draftNumber);
  const dispatch = useAppDispatch();

  const handleDraftChange = (draftNumber: number) => {
    dispatch(updateDraftNumber(draftNumber));
  };

  return (
    <DraftPickerStyled>
      <button
        className={`btn-primary ${draftNumber === 0 ? "selected" : ""}`}
        onClick={() => handleDraftChange(0)}
      >
        Draft 1
      </button>
      <button
        className={`btn-primary ${draftNumber === 1 ? "selected" : ""}`}
        onClick={() => handleDraftChange(1)}
      >
        Draft 2
      </button>
    </DraftPickerStyled>
  );
};

export default DraftPicker;
