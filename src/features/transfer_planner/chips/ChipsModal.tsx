import { useThisGameweekData } from "../../../app/customHooks";
import { useAppDispatch } from "../../../app/hooks";
import { setChip } from "../../../store_features/drafts/draftsSlice";
import { ChipsModalStyled } from "./Chips.styled";
import { ChipsModalProps } from "./chipsInterfaces";

const ChipsModal = ({ modal, setModal }: ChipsModalProps) => {
  const dispatch = useAppDispatch();

  const currentChip = useThisGameweekData().chipByGameweek;

  return (
    <ChipsModalStyled onClick={(e) => e.stopPropagation()}>
      <p>
        Do you want to remove your current chip and delete transfer planner
        state from current gameweek onwards?
      </p>
      <div className="chips-modal-btns">
        <button
          className="btn-delete"
          onClick={() => {
            dispatch(setChip({ chipName: "" }));
            if (currentChip !== modal.newChipName) {
              dispatch(setChip({ chipName: modal.newChipName }));
            }
            setModal({ ...modal, isOpen: false });
          }}
        >
          Delete
        </button>
        <button
          className="btn-primary"
          onClick={() => setModal({ ...modal, isOpen: false })}
        >
          Cancel
        </button>
      </div>
    </ChipsModalStyled>
  );
};

export default ChipsModal;
