export const PickActionButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return <button onClick={onClick}>{children}</button>;
};
