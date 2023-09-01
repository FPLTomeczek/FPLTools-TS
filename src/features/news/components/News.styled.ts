import styled from "styled-components";

export const SinglePostStyled = styled.div`
  max-width: 1200px;
  padding: 4rem 0;
  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .post-img-container {
    width: 100%;
    overflow: hidden;
  }
  .post-read-more {
    margin-left: 1rem;
    color: ${(props) => props.theme.colors.highContrast};
  }
  p {
    color: var(--primary-color-light);
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
`;
