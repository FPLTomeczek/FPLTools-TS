import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";

export const useCalendarTimer = () => {
  const deadline = useAppSelector((state) => state.gameweeks.deadline);
  const [currentDate, setCurrentDate] = useState(new Date());
  const targetDate = new Date(deadline);

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  const { days, hours, minutes, seconds } = convertGetTime(timeDifference);

  return {
    days,
    hours,
    minutes,
    seconds,
    setCurrentDate,
  };
};

function convertGetTime(ms: number) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor(ms / (1000 * 60 * 60) - days * 24);
  const minutes = Math.floor(ms / (1000 * 60) - days * 24 * 60 - hours * 60);
  const seconds = Math.floor(
    ms / 1000 - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
  );

  return {
    days: isNaN(days) ? 0 : days,
    hours: isNaN(hours) ? 0 : hours,
    minutes: isNaN(minutes) ? 0 : minutes,
    seconds: isNaN(seconds) ? 0 : seconds,
  };
}
