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
  .list-item-navbar__link {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 0.3s ease-out;
  }
  .list-item-navbar__link:hover {
    color: ${(props) =>
      props.darkMode ? "var(--secondary-color)" : "#7b4f01"};
  }
  .navbar-logo {
    width: 32px;
    height: 32px;
    padding: 0.5rem;
  }
  .list-item-navbar__link__active {
    color: ${(props) =>
      props.darkMode ? "var(--secondary-color-light)" : "#b77601"};
  }
  .navbar-right-content {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .navbar-right-content__auth {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
  }
  .navbar-right-content__auth__button {
    color: ${(props) => (props.darkMode ? "#FFFFFF" : "#000000")};
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
