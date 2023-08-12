import styled from "styled-components";

export const PlayerRankingsFiltersStyled = styled.div`
  max-width: 100%;
  margin-top: 2rem;
`;

export const PlayerRankingsFilterButtonsStyled = styled.div<{
  darkMode: boolean;
}>`
  position: relative;
  padding: 0.5rem 2px;
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;

  & > * {
    padding: 0.25rem 0.5rem;
    min-width: 100px;
    white-space: nowrap;
    background-color: ${(props) => (props.darkMode ? "#000000" : "#f0f0f0")};
    flex-shrink: 0;
    color: ${(props) => props.theme.colors.text};
  }
  #reset-button {
    min-width: fit-content;
    display: flex;
  }
`;

export const PlayerRankingsListStyled = styled.div<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
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
    background-color: ${(props) => (props.darkMode ? "#000000" : "#f0f0f0")};
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
