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
  .player-list-filter {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
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
