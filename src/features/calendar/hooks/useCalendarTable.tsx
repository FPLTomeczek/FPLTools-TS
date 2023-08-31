const useCalendarTable = () => {
  function offsetScrollbarToCurrentGw() {
    const currentGameweekElement = document.querySelector(
      ".calendar-th:nth-child(3)"
    ) as HTMLElement;
    const table = document.getElementById("table-calendar");
    if (table && table.scrollLeft === 0) {
      table.scrollLeft += currentGameweekElement.offsetLeft;
    }
  }

  return { offsetScrollbarToCurrentGw };
};

export default useCalendarTable;
