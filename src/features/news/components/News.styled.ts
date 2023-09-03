import styled from "styled-components";

export const SinglePostStyled = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 4rem;

  .post-header {
    display: flex;
    flex-direction: column;
  }
  .post-img-container {
    width: 100%;
    overflow: hidden;
  }
  .post-read-more {
    margin-left: 1rem;
    color: ${(props) => props.theme.colors.highContrast};
  }
  .post-text {
    color: var(--grey-color);
  }

  img {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: transform 1s;
  }
  img:hover {
    transform: scale(1.1);
  }
  @media screen and (min-width: 480px) {
    .post-header {
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
  }
`;

export const RecentPostsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 380px;

  @media screen and (min-width: 480px) {
    width: 380px;
    max-width: none;
  }

  .recent-posts__hero-container {
    display: flex;
    justify-content: center;
  }
  .recent-posts__posts-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .recent-post {
    display: flex;
    gap: 2rem;
    justify-content: flex-start;
    align-items: center;
    max-width: 500px;
  }
  .recent-post__img-container {
    max-width: 100px;
  }
  .recent-post__img-container img {
    width: 100%;
    object-fit: cover;
  }
  .recent-post__title {
    width: 200px;
  }
`;
