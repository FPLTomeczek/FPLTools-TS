import styled from "styled-components";

export const LoginFormStyled = styled.form<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: 1rem;

  .input-container {
    display: flex;
    flex-direction: column;
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
  }
`;
