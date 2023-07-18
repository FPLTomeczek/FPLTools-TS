import { useRef, useState } from "react";
import TransferPlannerContent from "../features/transfer_planner/TransferPlannerContent";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getDemoManagerTeam,
  getManagerData,
} from "../features/transfer_planner/service/getData";
import { TransferPlannerStyled } from "./Pages.styled";
import Note from "../components/Note";
import { NOTE_FETCHING_TEAM_UNAVAILABLE } from "../constants";
import { setData } from "../store_features/drafts/draftsSlice";
import managerTeam from "../assets/demo-data/manager-team-info.json";
import managerHistory from "../assets/demo-data/managerHistory.json";
import Hero from "../components/Hero";

const TransferPlanner = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState({ value: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const playersHistory = useAppSelector(
    (state) => state.players.playersHistory
  );

  const dispatch = useAppDispatch();

  const handlePlayingDemo = async () => {
    const picks = await getDemoManagerTeam(managerTeam.picks);
    dispatch(setData({ picks, managerHistory }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const id = inputRef.current ? Number(inputRef.current.value) : 0;
    getManagerData(id, dispatch, playersHistory, setError, setIsLoading);
  };

  return (
    <TransferPlannerStyled>
      <Hero text="Transfer Planner" />
      <div className="transfer-planner-demo">
        <button className="btn-primary" onClick={handlePlayingDemo}>
          DEMO
        </button>
        <Note text={NOTE_FETCHING_TEAM_UNAVAILABLE} />
      </div>
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
          className="btn-primary"
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
