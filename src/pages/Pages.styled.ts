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
`;
