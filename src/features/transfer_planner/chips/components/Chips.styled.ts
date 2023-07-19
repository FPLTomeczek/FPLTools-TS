import styled from "styled-components";

export const ChipsStyled = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  .chip-button {
    padding: 2rem;
    width: 100%;
    cursor: pointer;
  }
  .chip-available {
    background-color: var(--secondary-color);
  }
  .chip-unavailable {
    cursor: default;
    background-color: var(--disabled-color);
  }
  .chip-active {
    animation: color-change 1s infinite;
  }

  @keyframes color-change {
    0% {
      background-color: var(--secondary-color);
    }
    50% {
      background-color: var(--secondary-color-dark);
    }
    100% {
      background-color: var(--secondary-color);
    }
  }

  @media screen and (max-width: 800px) {
    padding: 0 1rem;
    .chip-button {
      padding: 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    .chip-button {
      padding: 0.25rem;
    }
  }
`;

export const ChipsModalContainerStyled = styled.div<{ isModalOpen: boolean }>`
  display: ${(props) => (props.isModalOpen ? "block" : "none")};
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ChipsModalStyled = styled.div`
  background-color: var(--primary-color);
  border: 4px solid var(--secondary-color);
  border-radius: var(--primary-border-radius);
  margin: 0 auto;
  margin-top: 20vh;
  padding: 1rem;
  width: 200px;
  .chips-modal-btns {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;
