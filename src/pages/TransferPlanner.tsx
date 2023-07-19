import { useState } from "react";

import {
  TransferPlannerContentStyled,
  TransferPlannerStyled,
} from "./Pages.styled";
import Hero from "../layouts/components/Hero";
import SnackbarWrapper from "../shared/ui/Snackbar/SnackbarWrapper";
import UserIDForm from "../shared/ui/Form/UserIDForm";
import TransferPlannerDemo from "../features/transfer_planner/demo/TransferPlannerDemo";
import Pitch from "../features/transfer_planner/pitch/Pitch";
import PlayersList from "../features/transfer_planner/list/PlayersList";
import GameweeksTransfersContainer from "../features/transfer_planner/gameweeks_transfers_summary/components/GameweeksTransfersContainer";

const TransferPlannerContent = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <TransferPlannerContentStyled>
      <div className="pitch-playerlist-container">
        <Pitch isLoading={isLoading} />
        <PlayersList />
      </div>
      <GameweeksTransfersContainer />
    </TransferPlannerContentStyled>
  );
};

const TransferPlanner = () => {
  const [error, setError] = useState({ value: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSetError = (value: boolean, msg: string) => {
    setError({ value, msg });
  };

  return (
    <TransferPlannerStyled>
      <SnackbarWrapper error={error} handleSetError={handleSetError} />
      <Hero text="Transfer Planner" />
      <TransferPlannerDemo />
      <UserIDForm setError={setError} setIsLoading={setIsLoading} />
      <TransferPlannerContent isLoading={isLoading} />
    </TransferPlannerStyled>
  );
};

export default TransferPlanner;
