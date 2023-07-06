import styled from "styled-components";

export const TransferPlannerStyled = styled.div`
  display: flex;
  align-items: start;
  padding: 2rem 0;
  width: 100%;
  .pitch-container {
    display: flex;
    justify-content: center;
    align-items: start;
    width: 60%;
  }
  .player-list {
    width: 40%;
  }
  .gameweek-transfer-container-m {
    display: none;
  }

  @media screen and (max-width: 1400px) {
    flex-direction: column;
    .player-list,
    .pitch-container {
      width: 100%;
    }
    .gameweek-transfer-container-m {
      display: block;
      width: 100%;
    }
  }
`;

export const PitchStyled = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  .planner-picks {
    max-width: 800px;
    width: 100%;
  }

  @media screen and (max-width: 1400px) {
    .gameweek-transfer-container-planner-picks {
      display: none;
    }
  }
`;

export const FirstElevenStyled = styled.div<{ imageURL: string }>`
  display: flex;
  justify-content: center;

  .pitch {
    width: 800px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-image: url(${(props) => props.imageURL});
    // <a href="https://www.vecteezy.com/free-vector/football-pitch">
    //   Football Pitch Vectors by Vecteezy
    // </a>;
  }

  .picks-row {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 2rem 0;
  }
  .picks-row > * {
    flex: 1;
  }

  @media screen and (max-width: 800px) {
    .pitch {
      width: 100vw;
      background-size: 100% 100%;
    }
  }

  @media screen and (max-width: 480px) {
    .picks-row {
      padding: 0.25rem 0;
    }
  }
`;

export const PitchHeaderStyled = styled.div`
  @media screen and (max-width: 800px) {
    padding: 0 1rem;
  }
`;

export const BenchStyled = styled.div<{ BBPlayed: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: var(--light-green);
  padding: 1rem 2rem;
  border: ${(props) =>
    props.BBPlayed ? "6px solid rgb(2, 239, 255)" : "none"};
`;

export const GameweeksTransfersContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  padding: 1rem 0;
  flex-wrap: wrap;
  gap: 1rem;
  width: 80vw;
  overflow: visible;
  @media screen and (max-width: 1400px) {
    width: 100%;
    justify-content: center;
  }
`;

export const DraftPickerStyled = styled.div`
  display: flex;
  justify-content: start;
  gap: 1rem;
  .selected {
    background-color: var(--secondary-color-dark);
  }
`;

export const ManagerTeamInfoStyled = styled.div`
  .save-team {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 1rem;
  }
  .gameweek-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .pitch-header-info {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .pitch-header-info > * {
    flex: 1;
    max-width: 100%;
  }
  .info-container > p,
  .gameweek-container {
    font-size: clamp(0.75rem, calc(0.45rem + 1.25vw), 1rem);
  }
  .info-container {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  i {
    font-size: 1rem;
  }
  #transfers-info {
    justify-content: end;
  }
  #transfers-info > p {
    text-align: right;
  }
  .error-value {
    color: #ff0f0f;
  }
  @media screen and (max-width: 600px) {
    .gameweek-container {
      flex: 2;
    }
  }
`;

export const PickStyled = styled.div`
  .player-pick {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
  }
  .player-pick-text {
    min-width: 100px;
    box-sizing: border-box;
    text-align: center;
    background-color: white;
    padding: 0.25rem;
    margin: 2px 0;
  }
  .player-pick > i {
    font-size: 4rem;
  }
  .change-pick {
    background-color: yellow;
  }
  .manipulate-player-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
  button {
    cursor: pointer;
  }
  .player-pick-price {
    position: absolute;
    right: 0;
    top: -20px;
    background-color: var(--light-green);
    font-size: 0.8rem;
  }
  #player-pick-next-fixture {
    position: relative;
  }
  .bench-price {
    background-color: var(--secondary-color);
  }

  @media screen and (max-width: 480px) {
    .player-pick-text {
      font-size: 0.75rem;
      max-width: 100px;
      min-width: auto;
    }
  }
`;
