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
import { useAppDispatch } from "../app/hooks";
import { AppDispatch } from "../app/store";
import { Player } from "../components/features/transfer_planner/interfaces/player";

const getManagerData = async (id: string, dispatch: AppDispatch) => {
  let players = await getManagerTeam(id);
  const managerHistory = await getManagerHistory(id);
  const transfers = await getTransfers(id);
  const sellCosts = calculateSellingCost(players, transfers);
  players = players.map((player: Player, ind: number) => {
    return { ...player, sellCost: sellCosts[ind] };
  });
  localStorage.setItem("fetchedPlayers", JSON.stringify(players));
  localStorage.setItem("managerHistory", JSON.stringify(managerHistory));
  localStorage.setItem("transfersHistory", JSON.stringify(transfers));
  dispatch(addPicks(players));
  dispatch(addManagerHistory(managerHistory));
  dispatch(addTransfersHistory(transfers));
};

const MainPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: Event) => {
    const id = inputRef.current ? inputRef.current.value : "0";
    e.preventDefault();
    getManagerData(id, dispatch);
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
          onClick={(e) => handleSubmit(e)}
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
