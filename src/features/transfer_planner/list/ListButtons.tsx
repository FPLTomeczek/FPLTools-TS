import { Direction } from "../enums/transferPlanner";
import { ListProps } from "../types/list";
import styled from "styled-components";
import DirectionButtonPage from "../direction_buttons/DirectionButtonPage";

const ListButtons = (props: ListProps) => {
  return (
    <Wrapper>
      <DirectionButtonPage direction={Direction.FIRST} callbackProps={props} />
      <DirectionButtonPage direction={Direction.PREV} callbackProps={props} />
      <p>
        {props.page} / {props.numOfPages}
      </p>
      <DirectionButtonPage direction={Direction.NEXT} callbackProps={props} />
      <DirectionButtonPage direction={Direction.LAST} callbackProps={props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 30px;
  .direction-button > svg {
    font-size: 1rem;
  }
`;

export default ListButtons;
