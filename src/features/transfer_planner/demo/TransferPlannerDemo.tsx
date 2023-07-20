import { NOTE_FETCHING_TEAM_UNAVAILABLE } from "../../../shared/utils/constants";
import { useAppDispatch } from "../../../store/hooks";
import { setData } from "../../../store_features/drafts/draftsSlice";
import Note from "../Note";
import { getDemoManagerTeam } from "../service/getData";
import managerTeam from "../../../shared/assets/demo-data/manager-team-info.json";
import managerHistory from "../../../shared/assets/demo-data/managerHistory.json";
import { TransferPlannerDemoStyled } from "./TransferPlannerDemo.styled";

const TransferPlannerDemo = () => {
  const dispatch = useAppDispatch();

  const handlePlayingDemo = async () => {
    const picks = await getDemoManagerTeam(managerTeam.picks);
    dispatch(setData({ picks, managerHistory }));
  };

  return (
    <TransferPlannerDemoStyled>
      <button className="btn-primary" onClick={handlePlayingDemo}>
        DEMO
      </button>
      <Note text={NOTE_FETCHING_TEAM_UNAVAILABLE} />
    </TransferPlannerDemoStyled>
  );
};

export default TransferPlannerDemo;
