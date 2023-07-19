import { useEffect, useState } from "react";

import { useAppSelector } from "../../store/hooks";
import { CalendarTimerStyled } from "./Calendar.styled";

const CalendarTimer = () => {
  const deadline = useAppSelector((state) => state.gameweeks.deadline);
  const [currentDate, setCurrentDate] = useState(new Date());
  const targetDate = new Date(deadline);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const differenceInHours = Math.floor(
    timeDifference / (1000 * 60 * 60) - differenceInDays * 24
  );
  const differenceInMinutes = Math.floor(
    timeDifference / (1000 * 60) -
      differenceInDays * 24 * 60 -
      differenceInHours * 60
  );
  const differenceInSeconds = Math.floor(
    timeDifference / 1000 -
      differenceInDays * 24 * 60 * 60 -
      differenceInHours * 60 * 60 -
      differenceInMinutes * 60
  );

  return (
    <CalendarTimerStyled>
      <h2>Next GW Deadline</h2>
      <div className="timer-countdown">
        <div className="timer-countdown-item">
          <div>{differenceInDays}</div>
          <span className="time-desc">days</span>
        </div>
        <div className="timer-countdown-item">
          <div>{differenceInHours} </div>
          <span className="time-desc">hours</span>
        </div>

        <div className="timer-countdown-item">
          <div>{differenceInMinutes}</div>
          <span className="time-desc">minutes</span>
        </div>
        <div className="timer-countdown-item">
          <div>{differenceInSeconds}</div>
          <span className="time-desc">seconds</span>
        </div>
      </div>
    </CalendarTimerStyled>
  );
};

export default CalendarTimer;
