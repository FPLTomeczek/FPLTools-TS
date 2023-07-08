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
      <p>Do you want to cancel your chip?</p>
      <button
        onClick={() => {
          dispatch(setChip({ chipName: "" }));
          setIsModalOpen(false);
        }}
      >
        Yes
      </button>
      <button onClick={() => setIsModalOpen(false)}>No</button>
    </ChipsModalStyled>
  );
};

const ChipsModalStyled = styled.div<{ isModalOpen: boolean }>`
  display: ${(props) => (props.isModalOpen ? "block" : "none")};
  position: fixed;
  bottom: 500px;
  left: 600px;
  width: 200px;
  margin: 0 auto;
`;

export default ChipsModal;
