import { useRef } from "react";
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
import { Button, TextField, Box } from "@mui/material";
import { calculateSellingCost } from "../components/features/transfer_planner/utils";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AppDispatch } from "../app/store";
import { PlayerPick } from "../components/features/transfer_planner/interfaces/managerTeam";
import { PlayerHistory } from "../components/features/transfer_planner/interfaces/players";

const getManagerData = async (
  id: number,
  dispatch: AppDispatch,
  playersHistory: PlayerHistory[]
) => {
  let picks: PlayerPick[] = await getManagerTeam(id);
  const managerHistory = await getManagerHistory(id);
  const transfers = await getTransfers(id);
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
};

const MainPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const playersHistory = useAppSelector(
    (state) => state.players.playersHistory
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = inputRef.current ? Number(inputRef.current.value) : 0;
    e.preventDefault();
    getManagerData(id, dispatch, playersHistory);
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
      <TransferPlanner />
    </Box>
  );
};

export default MainPage;
