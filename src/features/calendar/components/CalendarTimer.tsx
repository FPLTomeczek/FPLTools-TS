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
        <div className="timer-countdown-item">
          <div>{days}</div>
          <span className="time-desc">days</span>
        </div>
        <div className="timer-countdown-item">
          <div>{hours} </div>
          <span className="time-desc">hours</span>
        </div>

        <div className="timer-countdown-item">
          <div data-testid="timer-minutes">{minutes}</div>
          <span className="time-desc">minutes</span>
        </div>
        <div className="timer-countdown-item">
          <div data-testid="timer-seconds">{seconds}</div>
          <span className="time-desc">seconds</span>
        </div>
      </div>
    </CalendarTimerStyled>
  );
};

export default CalendarTimer;
