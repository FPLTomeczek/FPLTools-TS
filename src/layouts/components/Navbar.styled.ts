import styled from "styled-components";

export const NavbarStyled = styled.nav<{ darkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 2rem;
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
    color: ${(props) => props.theme.colors.text};
  }
  .mobile-visible {
    display: none;
  }
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 0.3s ease-out;
  }
  & a:hover {
    color: ${(props) =>
      props.darkMode ? "var(--secondary-color)" : "#7b4f01"};
  }
  .navbar-logo {
    width: 32px;
    height: 32px;
    padding: 0.5rem;
  }
  .list-item-navbar-active {
    color: ${(props) =>
      props.darkMode ? "var(--secondary-color-light)" : "#b77601"};
  }
  .navbar-mobile-content {
    display: flex;
    align-items: center;
    gap: 2rem;
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
    .mobile-visible {
      display: block;
    }
  }
`;
