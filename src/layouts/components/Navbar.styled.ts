import styled from "styled-components";

export const NavbarStyled = styled.nav`
  border-bottom: 1px solid var(--secondary-color);
  .nav-list {
    margin-left: 1rem;
    display: flex;
    gap: 2rem;
  }
  .nav-list > li {
    padding: 0.5rem;
  }
  .nav-list a {
    color: white;
  }
  .nav-list a:visited {
    color: white;
  }
  .mobile {
    display: none;
  }
  .mobile > li {
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 900px) {
    .nav-list {
      display: none;
    }
    .mobile {
      margin: 0 2rem;
      display: flex;
      justify-content: space-between;
    }
  }
`;
