import styled from "styled-components";

export const NavbarStyled = styled.nav`
  .nav-list {
    margin-left: 1rem;
    display: flex;
    gap: 2rem;
    justify-content: flex-start;
  }
  .list-item-navbar {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .list-item-navbar-mobile {
    display: none;
  }
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 0.3s ease-out;
  }
  & a:hover {
    color: var(--secondary-color);
  }
  .navbar-logo {
    width: 32px;
    height: 32px;
    padding: 0.5rem;
  }
  .text-secondary-light {
    color: var(--secondary-color-light);
  }
  @media screen and (max-width: 900px) {
    .nav-list {
      justify-content: space-between;
      align-items: center;
      margin-right: 1rem;
    }
    .list-item-navbar {
      display: none;
    }
    .list-item-navbar-mobile {
      display: block;
    }
  }
`;
