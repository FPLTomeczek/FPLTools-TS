import { handleSettingPages } from "./utils";
import { Direction } from "../enums/transferPlanner";
import { ListProps } from "../types/list";
import styled from "styled-components";

const ListButtons = ({ setPage, numOfPages, page }: ListProps) => {
  return (
    <Wrapper>
      <button
        className="direction-button"
        onClick={() => handleSettingPages(setPage, Direction.FIRST, numOfPages)}
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button
        className="direction-button"
        onClick={() => handleSettingPages(setPage, Direction.PREV, numOfPages)}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <p>
        {page} / {numOfPages}
      </p>
      <button
        className="direction-button"
        onClick={() => handleSettingPages(setPage, Direction.NEXT, numOfPages)}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <button
        className="direction-button"
        onClick={() => handleSettingPages(setPage, Direction.LAST, numOfPages)}
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 30px;
`;

export default ListButtons;
