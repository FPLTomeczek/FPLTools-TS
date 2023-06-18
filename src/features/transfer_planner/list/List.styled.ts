import styled from "styled-components";

export const PlayersListFiltersStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  .filters-container {
    display: flex;
    gap: 1rem;
    align-items: start;
    flex-direction: column;
  }
  .select-filters-container {
    display: flex;
    gap: 1rem;
  }
  .select-filter {
    display: flex;
    flex-direction: column;
  }
  .select-filter > label {
    margin-bottom: 4px;
  }
  @media screen and (max-width: 520px) {
    flex-direction: column;
    align-items: start;
    .filters-container {
      margin-bottom: 1rem;
    }
  }
`;

export const PlayersListItemsStyled = styled.div`
  .player-list-item,
  .player-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: clamp(0.75rem, calc(0.24rem + 2.35vw), 1rem);
  }
  .player-list-item {
    border-top: 1px solid gray;
  }
  .player-list-number {
    min-width: 12%;
  }
  .player-list-name {
    min-width: 35%;
  }
  .player-add-button-color {
    display: flex;
    align-items: center;
    justify-content: space-around;

    min-width: 15%;
  }

  .player-list-number {
    display: flex;
    align-items: center;
  }
  #player-list-points,
  #player-list-price {
    cursor: pointer;
  }
`;
