import styled from "styled-components";

export const TransferPlannerStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
`;

export const TransferPlannerContentStyled = styled.div`
  width: 100%;
  .pitch-playerlist-container {
    display: flex;
    align-items: start;
    width: 100%;
    justify-content: space-between;
  }

  @media screen and (max-width: 1400px) {
    .pitch-playerlist-container {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const PlayerRankingsPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #player-rankings-header {
    text-align: center;
  }
`;

export const ErrorPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  gap: 1rem;
  text-align: center;
  .return-to-home {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--primary-border-radius);
  }
`;

export const CalendarPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewsPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SingleNewsPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .single-news__post-container,
  .single-news__recent-posts-container {
    margin: 0 auto;
  }

  @media screen and (min-width: 1400px) {
    flex-direction: row;
  }
`;
