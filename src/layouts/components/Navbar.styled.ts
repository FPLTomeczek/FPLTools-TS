import styled from "styled-components";

export const NavbarStyled = styled.nav`
  border-bottom: 1px solid var(--secondary-color);
  .nav-list {
    margin-left: 1rem;
    display: flex;
    gap: 2rem;
    justify-content: flex-start;
  }
  .nav-list > li {
    padding: 0.5rem;
  }
  .nav-list a,
  .nav-list a:visited {
    color: white;
  }
  .list-item-navbar-mobile {
    display: none;
  }
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .navbar-logo {
    width: 32px;
  }
  @media screen and (max-width: 900px) {
    .nav-list {
      justify-content: space-between;
      align-items: center;
    }
    .list-item-navbar {
      display: none;
    }
    .list-item-navbar-mobile {
      display: block;
    }
  }
`;
