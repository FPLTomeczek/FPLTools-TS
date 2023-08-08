import React from "react";
import styled from "styled-components";

const StyledDirectionButton = styled.button`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
  transition: background-color 0.3s;
  padding: 0.5rem;

  &:hover {
    background-color: var(--secondary-color-dark);
  }

  & > svg {
    font-size: 1rem;
  }
`;

interface DirectionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DirectionButton = ({ children, ...rest }: DirectionButtonProps) => (
  <StyledDirectionButton {...rest}>{children}</StyledDirectionButton>
);

export { DirectionButton };
