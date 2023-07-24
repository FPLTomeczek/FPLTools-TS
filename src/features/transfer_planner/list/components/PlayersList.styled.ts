import styled from "styled-components";

export const PlayersListStyled = styled.div`
  width: 100%;
  margin-left: 2rem;
  margin-top: 2rem;
  box-sizing: border-box;

  @media screen and (max-width: 1400px) {
    margin-left: 0;
  }
`;

export const PlayersListItemsStyled = styled.div`
  margin-bottom: 1rem;
  .player-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: clamp(0.75rem, calc(0.24rem + 2.35vw), 1rem);
  }
  .player-list-name {
    min-width: 35%;
  }
  .player-list-number {
    min-width: 12%;
    display: flex;
    align-items: center;
  }
  #player-list-points,
  #player-list-price {
    cursor: pointer;
  }
  .player-add-button-color {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 15%;
  }
  .player-list-border {
    border-top: 1px solid gray;
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

export const PlayerListItemAddButtonStyled = styled.div`
  .add-button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .disabled {
    cursor: default;
  }
`;

export const ListButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 30px;
`;
