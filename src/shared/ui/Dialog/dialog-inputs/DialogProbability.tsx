import { FormControlLabel, Radio } from "@mui/material";

import RadioGroupWrapper from "./RadioGroupWrapper";
import { DialogFilter } from "../../../../features/player_rankings/enums/playerRankingsEnums";

const DialogProbability = ({
  dialogFilter,
}: {
  dialogFilter: DialogFilter;
}) => {
  return (
    <RadioGroupWrapper dialogFilter={dialogFilter}>
      <FormControlLabel
        value="Score"
        control={<Radio />}
        label="Scoring Chance"
      />
      {/* <FormControlLabel
        value="Assist"
        control={<Radio />}
        label="Assisting Chance"
      /> */}
    </RadioGroupWrapper>
  );
};

export default DialogProbability;
