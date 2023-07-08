import styled from "styled-components";
import { useAppDispatch } from "../../../app/hooks";
import { setChip } from "../../../store_features/drafts/draftsSlice";

const ChipsModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  return (
    <ChipsModalStyled isModalOpen={isModalOpen}>
      <div className="modal-inside">
        <p>
          Do you want to remove your current chip and delete transfer planner
          state from current gameweek onwards?
        </p>
        <div className="chips-modal-btns">
          <button
            className="btn-delete"
            onClick={() => {
              dispatch(setChip({ chipName: "" }));
              setIsModalOpen(false);
            }}
          >
            Delete
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </ChipsModalStyled>
  );
};

const ChipsModalStyled = styled.div<{ isModalOpen: boolean }>`
  display: ${(props) => (props.isModalOpen ? "block" : "none")};
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  .modal-inside {
    background-color: var(--primary-color);
    border: 4px solid var(--secondary-color);
    border-radius: var(--primary-border-radius);
    margin: 0 auto;
    margin-top: 20vh;
    padding: 1rem;
    width: 200px;
  }
  .chips-modal-btns {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

export default ChipsModal;
