import { useAppSelector } from "../../../../store/hooks";
import { DraftPickerStyled } from "./Pitch.styled";
import { useDraftActions } from "../hooks/useDraftActions";
import { Button } from "../../../../shared/ui/Buttons/Button";

const DraftPicker = () => {
  const draftNumber = useAppSelector((state) => state.drafts.draftNumber);
  const { handleDraftChange } = useDraftActions();

  return (
    <DraftPickerStyled>
      <Button
        className={`${draftNumber === 0 ? "selected" : ""}`}
        onClick={() => handleDraftChange(0)}
      >
        Draft 1
      </Button>
      <Button
        className={`${draftNumber === 1 ? "selected" : ""}`}
        onClick={() => handleDraftChange(1)}
      >
        Draft 2
      </Button>
    </DraftPickerStyled>
  );
};

export default DraftPicker;
