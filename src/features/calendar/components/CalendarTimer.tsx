import { useEffect } from "react";

import { CalendarTimerStyled } from "./Calendar.styled";
import { useCalendarTimer } from "../hooks/useCalendarTimer";

const CalendarTimer = () => {
  const { days, hours, minutes, seconds, setCurrentDate } = useCalendarTimer();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CalendarTimerStyled>
      <h2>Next GW Deadline</h2>
      <div className="timer-countdown">
        <CalendarTimerItem time={days} name="days" />
        <CalendarTimerItem time={hours} name="hours" />
        <CalendarTimerItem time={minutes} name="minutes" />
        <CalendarTimerItem time={seconds} name="seconds" />
      </div>
    </CalendarTimerStyled>
  );
};

const CalendarTimerItem = ({ time, name }: { time: number; name: string }) => {
  return (
    <div className="timer-countdown-item">
      <div>{time}</div>
      <span className="time-desc">{name}</span>
    </div>
  );
};

export default CalendarTimer;
