import { useRef, useState } from "react";
import {
  getManagerTeam,
  getManagerHistory,
  getTransfers,
} from "../components/features/transfer_planner/customHooks";
import {
  addPicks,
  addManagerHistory,
  addTransfersHistory,
} from "../features/managerTeam/managerTeamSlice";
import TransferPlanner from "../components/features/transfer_planner/TransferPlanner";
import { Button, TextField, Box, Alert, Snackbar } from "@mui/material";
import { calculateSellingCost } from "../components/features/transfer_planner/utils";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AppDispatch } from "../app/store";
import { PlayerPick } from "../components/features/transfer_planner/interfaces/managerTeam";
import { PlayerHistory } from "../components/features/transfer_planner/interfaces/players";

const getManagerData = async (
  id: number,
  dispatch: AppDispatch,
  playersHistory: PlayerHistory[],
  setError: React.Dispatch<
    React.SetStateAction<{
      value: boolean;
      msg: string;
    }>
  >,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let picks: PlayerPick[];
  let managerHistory;
  let transfers;
  setError({ value: false, msg: "" });

  try {
    picks = await getManagerTeam(id);
    managerHistory = await getManagerHistory(id);
    transfers = await getTransfers(id);
  } catch (error) {
    setError({
      value: true,
      msg: `Error trying to fetch user data with id: ${id}`,
    });
    setIsLoading(false);
    return;
  }
  const sellCosts = calculateSellingCost(picks, transfers, playersHistory);
  picks = picks.map((player: PlayerPick, ind: number) => {
    return { ...player, sellCost: sellCosts[ind] };
  });
  localStorage.setItem("fetchedPlayers", JSON.stringify(picks));
  localStorage.setItem("managerHistory", JSON.stringify(managerHistory));
  localStorage.setItem("transfersHistory", JSON.stringify(transfers));
  dispatch(addPicks(picks));
  dispatch(addManagerHistory(managerHistory));
  dispatch(addTransfersHistory(transfers));
  setIsLoading(false);
};

const MainPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState({ value: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const playersHistory = useAppSelector(
    (state) => state.players.playersHistory
  );

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    const id = inputRef.current ? Number(inputRef.current.value) : 0;
    e.preventDefault();
    getManagerData(id, dispatch, playersHistory, setError, setIsLoading);
  };

  return (
    <Box
      mt={2}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        maxWidth: "100vw",
      }}
    >
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
      <form>
        <TextField
          id="outlined-basic"
          label="Enter Your ID"
          variant="outlined"
          inputRef={inputRef}
          size="small"
        />
        <Button
          variant="contained"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
          sx={{ fontSize: "1rem" }}
        >
          Submit
        </Button>
      </form>
      <TransferPlanner isLoading={isLoading} />
    </Box>
  );
};

export default MainPage;
