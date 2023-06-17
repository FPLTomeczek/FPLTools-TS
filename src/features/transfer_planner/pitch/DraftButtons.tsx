import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateDraftNumber } from "../../../store_features/drafts/draftsSlice";

const DraftButtons = () => {
  const draftNumber = useAppSelector((state) => state.drafts.draftNumber);
  const dispatch = useAppDispatch();

  const handleDraftChange = (draftNumber: number) => {
    dispatch(updateDraftNumber(draftNumber));
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  gap: 1rem;
  .selected {
    background-color: var(--secondary-color-dark);
  }
`;

export default DraftButtons;
