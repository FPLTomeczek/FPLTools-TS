import { ChipsModalContainerStyled } from "./Chips.styled";
import ChipsModal from "./ChipsModal";
import { ChipsModalProps } from "../interfaces/chipsInterfaces";

const ChipsModalWrapper = ({ modal, setModal }: ChipsModalProps) => {
  return (
    <ChipsModalContainerStyled
      isModalOpen={modal.isOpen}
      onClick={() => setModal({ ...modal, isOpen: false })}
    >
      <ChipsModal modal={modal} setModal={setModal} />
    </ChipsModalContainerStyled>
  );
};

export default ChipsModalWrapper;
