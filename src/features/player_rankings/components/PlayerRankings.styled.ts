import styled from "styled-components";

export const PlayerRankingsFiltersStyled = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

export const PlayerRankingsFilterButtonsStyled = styled.div`
  position: relative;
  padding: 1rem 2px;
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  & > * {
    padding: 0.25rem 0.5rem;
    min-width: 100px;
    white-space: nowrap;
    background-color: black;
    flex-shrink: 0;
    color: white;
  }
  #reset-button {
    min-width: fit-content;
    display: flex;
  }
`;

export const PlayerRankingsListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
  width: 100%;

  & p {
    margin: 0;
  }
  .player-ranking-item {
    display: flex;
    width: 100%;
    height: 25px;
  }

  .player-ranking-item-desc {
    max-width: 180px;
    min-width: 140px;
  }

  .player-ranking-item-probability {
    width: 100%;
    height: inherit;
  }
  .probability-bar {
    display: flex;
    background-color: black;
    width: 100%;
    height: inherit;
  }
  .player-scoring-chance {
    margin-left: 0.5rem;
  }
  .load-more-btn-container {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 480px) {
    .load-more-btn {
      width: 100%;
    }
  }
`;
