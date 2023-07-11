import RadioGroupWrapper from "./RadioGroupWrapper";
import { FormControlLabel, Radio } from "@mui/material";
import { DialogFilter } from "../enums/playerRankingsEnums";

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
      <FormControlLabel
        value="Assist"
        control={<Radio />}
        label="Assisting Chance"
      />
    </RadioGroupWrapper>
  );
};

export default DialogProbability;
