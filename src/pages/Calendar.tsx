import Hero from "../layouts/components/Hero";
import CalendarTable from "../features/calendar/components/CalendarTable";
import CalendarTimer from "../features/calendar/components/CalendarTimer";
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
