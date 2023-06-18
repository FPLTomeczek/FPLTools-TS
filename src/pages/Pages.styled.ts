import styled from "styled-components";

export const TransferPlannerStyled = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  input {
    background: "white";
    padding: 0.5rem;
    margin-right: 4px;
  }
  #user-id-form {
    display: flex;
  }
  #user-id-form > input {
    max-width: 200px;
  }
`;
