import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateDraftNumber } from "../../../store_features/drafts/draftsSlice";
import { DraftButtonsStyled } from "./Pitch.styled";

const DraftButtons = () => {
  const draftNumber = useAppSelector((state) => state.drafts.draftNumber);
  const dispatch = useAppDispatch();

  const handleDraftChange = (draftNumber: number) => {
    dispatch(updateDraftNumber(draftNumber));
  };

  return (
    <DraftButtonsStyled>
      <button
        className={`primary-button ${draftNumber === 0 ? "selected" : ""}`}
        onClick={() => handleDraftChange(0)}
      >
        Draft 1
      </button>
      <button
        className={`primary-button ${draftNumber === 1 ? "selected" : ""}`}
        onClick={() => handleDraftChange(1)}
      >
        Draft 2
      </button>
    </DraftButtonsStyled>
  );
};

export default DraftButtons;
