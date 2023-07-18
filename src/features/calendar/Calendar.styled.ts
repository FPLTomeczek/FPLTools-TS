import styled from "styled-components";
export const CalendarTableStyled = styled.table`
  background-color: #272635;
  text-align: center;
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
