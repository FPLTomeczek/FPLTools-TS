import Hero from "../components/Hero";
import CalendarTable from "../features/calendar/CalendarTable";
import CalendarTimer from "../features/calendar/CalendarTimer";
import { CalendarPageStyled } from "./Pages.styled";

const Calendar = () => {
  return (
    <CalendarPageStyled>
      <Hero text="Calendar" />
      <CalendarTimer />
      <CalendarTable />
    </CalendarPageStyled>
  );
};

export default Calendar;
