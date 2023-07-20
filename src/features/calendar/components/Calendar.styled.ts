import styled from "styled-components";

export const CalendarTableStyled = styled.div`
  text-align: center;
  max-width: 100%;
  overflow-x: auto;
  & > table {
    background-color: #272635;
  }
  .calendar-thead {
    border-bottom: 1px solid gray;
  }
  .calendar-th {
    padding: 0.5rem 0;
  }
  .calendar-th > span {
    font-size: 0.625rem;
  }
  .content-td {
    display: flex;
    justify-content: space-around;
  }
`;

export const CalendarTimerStyled = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  .timer-countdown {
    display: flex;
    gap: 2rem;
  }
  .timer-countdown-item {
    background-color: #272635;
    padding: 0.5rem 2rem;
    min-width: 50px;
    border-radius: 8px;
    font-size: 2rem;
  }
  .time-desc {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 600px) {
    .timer-countdown {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
`;