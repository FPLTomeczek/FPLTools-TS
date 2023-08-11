import styled from "styled-components";
import { useTheme } from "../../theme/ThemeProvider";
import sunSVG from "../../assets/theme/sun.svg";
import moonSVG from "../../assets/theme/moon.svg";

const DefaultSwitch = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Switch>
      <Input type="checkbox" onChange={toggleTheme} />
      <Slider darkMode={darkMode} />
    </Switch>
  );
};

const Slider = styled.span<{ darkMode: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.button.background};
  border-radius: 15px;
  transition: 0.4s;

  &:before {
    content: "";
    position: absolute;
    left: 2px;
    bottom: 2px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: white;
    transition: 0.4s;
    background-image: ${(props) =>
      props.darkMode ? `url(${moonSVG})` : `url(${sunSVG})`};
  }
`;

const Input = styled.input`
  &:checked + ${Slider}:before {
    transform: translateX(23.4px);
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  border-radius: 15px;
  & ${Input} {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;
export default DefaultSwitch;
