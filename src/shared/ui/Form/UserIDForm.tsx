import { useRef } from "react";
import { getManagerData } from "../../../features/transfer_planner/service/getData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styled from "styled-components";

const UserIDForm = ({
  setError,
  setIsLoading,
}: {
  setError: React.Dispatch<
    React.SetStateAction<{
      value: boolean;
      msg: string;
    }>
  >;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const playersHistory = useAppSelector(
    (state) => state.players.playersHistory
  );

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const id = inputRef.current ? Number(inputRef.current.value) : 0;
    getManagerData(id, dispatch, playersHistory, setError, setIsLoading);
  };

  return (
    <UserIDFormStyled>
      <input placeholder="1234" ref={inputRef} />
      <button
        className="btn-primary"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
      >
        Submit
      </button>
    </UserIDFormStyled>
  );
};

const UserIDFormStyled = styled.form`
  display: flex;
  & > input {
    margin-right: 1rem;
  }
`;

export default UserIDForm;
