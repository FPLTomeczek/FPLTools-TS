import { handleSettingPages } from "./utils";
import { Direction } from "../enums/pages";
import { ListProps } from "../types/list";

const ListButtons = ({
  setPage,
  numOfPages,
}: Pick<ListProps, "setPage" | "numOfPages">) => {
  return (
    <div className="buttons">
      <button
        className="switchPage"
        onClick={() => handleSettingPages(setPage, Direction.FIRST, numOfPages)}
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button
        className="switchPage"
        onClick={() => handleSettingPages(setPage, Direction.PREV, numOfPages)}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        className="switchPage"
        onClick={() => handleSettingPages(setPage, Direction.NEXT, numOfPages)}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <button
        className="switchPage"
        onClick={() => handleSettingPages(setPage, Direction.LAST, numOfPages)}
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default ListButtons;
