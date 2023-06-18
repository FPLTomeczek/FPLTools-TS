import styled from "styled-components";

export const PlayersListStyled = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;

  @media screen and (max-width: 1400px) {
    padding: 1rem 4rem;
  }
  @media screen and (max-width: 800px) {
    padding: 1rem;
  }
`;

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

export const PlayerListItemColorStyled = styled.div<{
  listItemColor: string[];
}>`
  width: 20px;
  border-radius: 50%;
  background-color: black;
  background: ${(props) =>
    props.listItemColor.length > 1
      ? `linear-gradient(to right, ${props.listItemColor[0]} 0%, ${props.listItemColor[0]} 50%, ${props.listItemColor[1]} 50%, ${props.listItemColor[1]} 100%)`
      : props.listItemColor[0]};
  height: 20px;
`;

export const AddPlayerToTeamButtonStyled = styled.div`
  .add-button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .disabled {
    cursor: default;
  }
`;
