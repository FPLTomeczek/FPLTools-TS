import styled from "styled-components";

export const GameweekTransfersStyled = styled.div`
  padding: 2rem;
  border: 2px solid var(--secondary-color);
  border-radius: var(--primary-border-radius);
  height: fit-content;
  text-align: center;
  .gameweek-transfers-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .gameweek-transfers-picks {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .picks-transfer-status {
    padding: 0.5rem;
    color: white;
    text-transform: capitalize;
    display: block;
    max-width: 30px;
    text-align: center;
    border-radius: var(--primary-border-radius);
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  #picks-in {
    background-color: var(--light-green);
  }
  #picks-out {
    background-color: var(--warning-color);
  }
  @media screen and (max-width: 800px) {
    padding: 1rem;
  }
`;

export const SingleGameweekTransferStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
