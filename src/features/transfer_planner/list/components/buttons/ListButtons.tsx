import { Direction } from "../../../../../shared/ui/Buttons/enums/direction";
import { ListData } from "../filters/PlayersListFilters";
import { ListButtonsStyled } from "../PlayersList.styled";
import DirectionButton from "../../../../../shared/ui/Buttons/enums/DirectionButton";
import ArrowIcon from "../../../../../shared/ui/Icons/ArrowIcon";
import React from "react";

const directions = Object.values(Direction);

const ListButtons = ({ handleSetPage, page, numOfPages }: ListData) => {
  return (
    <ListButtonsStyled>
      {directions.map((direction) => {
        return (
          <React.Fragment key={direction}>
            <DirectionButton
              direction={direction}
              onClick={handleSetPage}
              ariaLabel={`${direction} page`}
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
