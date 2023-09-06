import { useState } from "react";

import { TransferPlannerPageStyled } from "./Pages.styled";
import Hero from "../layouts/components/Hero";
import SnackbarWrapper from "../shared/ui/Snackbar/SnackbarWrapper";
import UserIDForm from "../shared/ui/Form/UserIDForm";
import Pitch from "../features/transfer_planner/pitch/components/Pitch";
import PlayersList from "../features/transfer_planner/list/components/PlayersList";
import GameweeksTransfersContainer from "../features/transfer_planner/gameweeks_transfers_summary/components/GameweeksTransfersContainer";

const TransferPlannerContent = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="transfer-planer-content__container">
      <div className="pitch-playerlist__container">
        <Pitch isLoading={isLoading} />
        <PlayersList />
      </div>
      <GameweeksTransfersContainer />
    </div>
  );
};

const TransferPlanner = () => {
  const [error, setError] = useState({ value: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSetError = (value: boolean, msg: string) => {
    setError({ value, msg });
  };

  return (
    <TransferPlannerPageStyled>
      <SnackbarWrapper error={error} handleSetError={handleSetError} />
      <Hero>Transfer Planner</Hero>
      <UserIDForm setError={setError} setIsLoading={setIsLoading} />
      <TransferPlannerContent isLoading={isLoading} />
    </TransferPlannerPageStyled>
  );
};

export default TransferPlanner;
