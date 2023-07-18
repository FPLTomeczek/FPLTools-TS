import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppSelector } from "../../app/hooks";

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
      <div>
        <div className="days">
          <div>{differenceInDays}</div>
          <span className="time-desc">days</span>
        </div>
        <div className="hours">
          <div>{differenceInHours} </div>
          <span className="time-desc">hours</span>
        </div>

        <div className="minutes">
          <div>{differenceInMinutes}</div>
          <span className="time-desc">minutes</span>
        </div>
        <div className="seconds">
          <div>{differenceInSeconds}</div>
          <span className="time-desc">seconds</span>
        </div>
      </div>
    </CalendarTimerStyled>
  );
};

const CalendarTimerStyled = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  & > div {
    display: flex;
    gap: 2rem;
  }
  & > div > div {
    background-color: #272635;
    padding: 0.5rem 2rem;
    min-width: 50px;
    border-radius: 8px;
    font-size: 2rem;
  }
  .time-desc {
    font-size: 0.8rem;
  }
`;

export default CalendarTimer;
