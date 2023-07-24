import styled from "styled-components";

const StyledDeleteButton = styled.button`
  background-color: var(--warning-color);
  transition: background-color 0.3s;
  padding: 0.5rem;
  & :hover {
    background-color: var(--warning-color-dark);
  }
`;

interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DeleteButton = ({ children, ...rest }: DeleteButtonProps) => (
  <StyledDeleteButton {...rest}>{children}</StyledDeleteButton>
);

export { DeleteButton };
