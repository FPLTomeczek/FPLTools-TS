import styled from "styled-components";

export const TransferPlannerPageStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  .transfer-planer-content__container {
    width: 100%;
  }
  .pitch-playerlist__container {
    display: flex;
    align-items: start;
    width: 100%;
    justify-content: space-between;
  }

  @media screen and (max-width: 1400px) {
    .pitch-playerlist__container {
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

export const LoginPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
