import { useRef, useState } from "react";
import TransferPlannerContent from "../features/transfer_planner/TransferPlannerContent";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getManagerData } from "../features/transfer_planner/fetchDataUtils";
import { TransferPlannerStyled } from "./Pages.styled";

const TransferPlanner = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState({ value: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

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
    <TransferPlannerStyled>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={error.value}
        autoHideDuration={6000}
        onClose={() => setError({ value: false, msg: "" })}
      >
        <Alert variant="filled" severity="error">
          {error.msg}
        </Alert>
      </Snackbar>
      <form id="user-id-form">
        <input placeholder="Enter your ID" ref={inputRef} />
        <button
          className="primary-button"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
      <TransferPlannerContent isLoading={isLoading} />
    </TransferPlannerStyled>
  );
};

export default TransferPlanner;