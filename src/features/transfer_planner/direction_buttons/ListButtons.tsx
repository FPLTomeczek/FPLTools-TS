import { Direction } from "../enums/transferPlanner";
import { ListData } from "../interfaces/list";
import styled from "styled-components";
import DirectionButtonPage from "./DirectionButtonPage";

const ListButtons = (props: ListData) => {
  return (
    <ListButtonsStyled>
      <DirectionButtonPage direction={Direction.FIRST} callbackProps={props} />
      <DirectionButtonPage direction={Direction.PREV} callbackProps={props} />
      <p>
        {props.page} / {props.numOfPages}
      </p>
      <DirectionButtonPage direction={Direction.NEXT} callbackProps={props} />
      <DirectionButtonPage direction={Direction.LAST} callbackProps={props} />
    </ListButtonsStyled>
  );
};

const ListButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 30px;
`;

export default ListButtons;
