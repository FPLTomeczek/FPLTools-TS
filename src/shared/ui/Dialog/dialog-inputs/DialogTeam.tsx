import { FormControlLabel, Radio } from "@mui/material";

import { DialogFilter } from "../../../../features/player_rankings/enums/playerRankingsEnums";
import RadioGroupWrapper from "./RadioGroupWrapper";
import { TEAMS_LIST } from "../../../utils/data/teamsData";

const DialogTeam = ({ dialogFilter }: { dialogFilter: DialogFilter }) => {
  return (
    <RadioGroupWrapper dialogFilter={dialogFilter}>
      <FormControlLabel value="ALL" control={<Radio />} label="ALL" />
      {TEAMS_LIST.map((team) => {
        return (
          <FormControlLabel
            key={team.name}
            value={team.name}
            control={<Radio />}
            label={team.name}
          />
        );
      })}
    </RadioGroupWrapper>
  );
};

export default DialogTeam;
