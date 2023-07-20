import React from "react";
import { Direction } from "./direction";

type DirectionButtonProps = {
  children: React.ReactNode;
  onClick: (direction: Direction) => void;
  ariaLabel: string;
  direction: Direction;
};
const DirectionButton = ({
  children,
  onClick,
  ariaLabel,
  direction,
}: DirectionButtonProps) => {
  return (
    <button
      className="btn-direction"
      onClick={() => onClick(direction)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default DirectionButton;
