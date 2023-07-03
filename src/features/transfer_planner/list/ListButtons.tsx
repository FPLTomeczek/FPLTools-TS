import { Direction } from "../../../enums/direction";
import { ListData } from "./list";
import styled from "styled-components";
import DirectionButtonList from "./DirectionButtonList";

const ListButtons = (props: ListData) => {
  return (
    <ListButtonsStyled>
      <DirectionButtonList direction={Direction.FIRST} callbackProps={props} />
      <DirectionButtonList direction={Direction.PREV} callbackProps={props} />
      <p>
        {props.page} / {props.numOfPages}
      </p>
      <DirectionButtonList direction={Direction.NEXT} callbackProps={props} />
      <DirectionButtonList direction={Direction.LAST} callbackProps={props} />
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
