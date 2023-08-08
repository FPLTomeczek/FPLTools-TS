import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--secondary-color);
  transition: background-color 0.3s;
  padding: 0.5rem;
  &:hover {
    background-color: var(--secondary-color-dark);
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => (
  <StyledButton {...rest}>{children}</StyledButton>
);

export { Button };
