import styled from "styled-components";

export const PlayerRankingsFiltersStyled = styled.div`
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  & > * {
    padding: 0.25rem 0.5rem;
    min-width: 100px;
    white-space: nowrap;
    background-color: black;
    flex-shrink: 0;
    color: white;
  }
`;

export const PlayerRankingsListStyled = styled.div`
  & {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
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
`;
