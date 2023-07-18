import styled from "styled-components";

export const TransferPlannerStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  padding: 1rem;
  .transfer-planner-demo {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  input {
    background: "white";
    padding: 0.5rem;
    margin-right: 1rem;
  }
  #user-id-form {
    display: flex;
  }
  #user-id-form > input {
    max-width: 200px;
  }

  @media (max-width: 769px) {
    .transfer-planner-demo {
      flex-direction: column;
    }
  }
`;

export const PlayerRankingsPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  #player-rankings-header {
    text-align: center;
  }
`;

export const ErrorPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  gap: 1rem;
  text-align: center;
  .return-to-home {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--primary-border-radius);
  }
`;

export const CalendarPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;
