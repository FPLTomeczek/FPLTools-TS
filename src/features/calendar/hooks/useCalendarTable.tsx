import { CURRENT_GW } from "../../../shared/utils/constants";

const useCalendarTable = () => {
  function offsetScrollbarToCurrentGw() {
    const currentGameweekElement = document.querySelector(
      `.calendar-th:nth-child(${CURRENT_GW + 1})`
    ) as HTMLElement;
    const table = document.getElementById("table-calendar");
    if (table && table.scrollLeft === 0) {
      table.scrollLeft += currentGameweekElement.offsetLeft;
    }
  }

  return { offsetScrollbarToCurrentGw };
};

export default useCalendarTable;
