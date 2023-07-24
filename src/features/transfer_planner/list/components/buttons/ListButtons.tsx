import React from "react";

import { Direction } from "../../../../../shared/ui/Buttons/enums/direction";
import { ListButtonsStyled } from "../PlayersList.styled";
import ArrowIcon from "../../../../../shared/ui/Icons/ArrowIcon";
import { ListData } from "../types";
import { DirectionButton } from "../../../../../shared/ui/Buttons/DirectionButton";

const directions = Object.values(Direction);

const ListButtons = ({ handleSetPage, page, numOfPages }: ListData) => {
  return (
    <ListButtonsStyled>
      {directions.map((direction) => {
        return (
          <React.Fragment key={direction}>
            <DirectionButton
              onClick={() => handleSetPage(direction)}
              aria-label={`${direction} page`}
            >
              <ArrowIcon direction={direction} />
            </DirectionButton>
            {direction === Direction.PREV ? (
              <p>
                {page} / {numOfPages}
              </p>
            ) : null}
          </React.Fragment>
        );
      })}
    </ListButtonsStyled>
  );
};

export default ListButtons;
