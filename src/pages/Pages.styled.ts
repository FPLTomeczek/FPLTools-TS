import styled from "styled-components";

export const TransferPlannerStyled = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  .transfer-planner-header {
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
    .transfer-planner-header {
      flex-direction: column;
    }
  }
`;

export const PlayerRankingsPageStyled = styled.div`
  #player-rankings-header {
    text-align: center;
  }
  padding: 1rem;
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
