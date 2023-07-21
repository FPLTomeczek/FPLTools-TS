import { useThisGameweekData } from "../../../../store/customHooks";
import { useAppDispatch } from "../../../../store/hooks";
import { setChip } from "../../../../store_features/drafts/draftsSlice";
import { ChipsModalStyled } from "./Chips.styled";
import { ChipsModalProps } from "../interfaces/chipsInterfaces";
import { Button } from "../../../../shared/ui/Buttons/Button";
import { DeleteButton } from "../../../../shared/ui/Buttons/DeleteButton";

const ChipsModal = ({ modal, setModal }: ChipsModalProps) => {
  const dispatch = useAppDispatch();

  const currentChip = useThisGameweekData()?.chipByGameweek;

  return (
    <ChipsModalStyled onClick={(e) => e.stopPropagation()}>
      <p>
        Do you want to remove your current chip and delete transfer planner
        state from current gameweek onwards?
      </p>
      <div className="chips-modal-btns">
        <DeleteButton
          onClick={() => {
            dispatch(setChip({ chipName: "" }));
            if (currentChip !== modal.newChipName) {
              dispatch(setChip({ chipName: modal.newChipName }));
            }
            setModal({ ...modal, isOpen: false });
          }}
        >
          Delete
        </DeleteButton>
        <Button onClick={() => setModal({ ...modal, isOpen: false })}>
          Cancel
        </Button>
      </div>
    </ChipsModalStyled>
  );
};

export default ChipsModal;
