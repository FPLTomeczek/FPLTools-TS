import { useState } from "react";

import {
  TransferPlannerContentStyled,
  TransferPlannerStyled,
} from "./Pages.styled";
import Hero from "../layouts/components/Hero";
import SnackbarWrapper from "../shared/ui/Snackbar/SnackbarWrapper";
import UserIDForm from "../shared/ui/Form/UserIDForm";
import Pitch from "../features/transfer_planner/pitch/components/Pitch";
import PlayersList from "../features/transfer_planner/list/components/PlayersList";
import GameweeksTransfersContainer from "../features/transfer_planner/gameweeks_transfers_summary/components/GameweeksTransfersContainer";

const TransferPlannerContent = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <TransferPlannerContentStyled>
      <div>
        <div className="pitch-playerlist-container">
          <Pitch isLoading={isLoading} />
          <PlayersList />
        </div>
        <GameweeksTransfersContainer />
      </div>
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
      <UserIDForm setError={setError} setIsLoading={setIsLoading} />
      <TransferPlannerContent isLoading={isLoading} />
    </TransferPlannerStyled>
  );
};

export default TransferPlanner;
