import styled from "styled-components";

export const LoginFormStyled = styled.form<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  .input-container {
    display: flex;
    flex-direction: column;
  }
  .input-container > label {
    text-transform: capitalize;
  }
  .input-container > input {
    width: 100%;
    background-color: ${(props) =>
      props.darkMode
        ? "var(--primary-color-light)"
        : "var(--secondary-color-light)"};
    color: ${(props) => (props.darkMode ? "#FFFFFF" : "#000000")};
    border: 2px solid var(--secondary-color);
    box-sizing: border-box;
    &:focus,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: ${(props) =>
        props.darkMode ? "#FFFFFF" : "#000000"};
      -webkit-box-shadow: 0 0 0px 1000px
        ${(props) =>
          props.darkMode
            ? "var(--primary-color-light)"
            : "var(--secondary-color-light)"}
        inset;
    }
  }
  .register-text {
    color: ${(props) =>
      props.darkMode
        ? "var(--secondary-color)"
        : "var(--secondary-color-dark)"};
  }
`;

export const EmailVerificationRedirectStyled = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
