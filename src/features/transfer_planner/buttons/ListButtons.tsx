import { Direction } from "../enums/transferPlanner";
import { ListData } from "../interfaces/list";
import styled from "styled-components";
import DirectionButtonPage from "./DirectionButtonPage";

const ListButtons = (props: ListData) => {
  return (
    <ListButtonsStyled>
      {Object.keys(Direction).map((direction, index) =>
        index !== 1 ? (
          <DirectionButtonPage
            key={direction}
            direction={Direction[direction as keyof typeof Direction]}
            callbackProps={props}
          />
        ) : (
          <>
            <DirectionButtonPage
              key={direction}
              direction={Direction[direction as keyof typeof Direction]}
              callbackProps={props}
            />
            <p>
              {props.page} / {props.numOfPages}
            </p>
          </>
        )
      )}
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
