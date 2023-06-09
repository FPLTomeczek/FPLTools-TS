import { DialogFilter } from "../enums/playerRankingsEnums";
import RadioGroupWrapper from "./RadioGroupWrapper";
import { FormControlLabel, Radio } from "@mui/material";
import { TEAMS_LIST } from "../../../data";

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
