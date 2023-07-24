import { useRef } from "react";
import { getManagerData } from "../../../features/transfer_planner/service/getData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styled from "styled-components";
import { Button } from "../Buttons/Button";

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
      <Button
        className="submit-user-id-btn"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
      >
        Submit
      </Button>
    </UserIDFormStyled>
  );
};

const UserIDFormStyled = styled.form`
  display: flex;
  margin-top: 2rem;
  & > input {
    margin-right: 1rem;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
    .submit-user-id-btn {
      width: 100%;
    }
  }
`;

export default UserIDForm;
