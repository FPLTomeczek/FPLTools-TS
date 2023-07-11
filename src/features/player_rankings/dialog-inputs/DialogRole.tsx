import RadioGroupWrapper from "./RadioGroupWrapper";
import { FormControlLabel, Radio } from "@mui/material";
import { ROLES } from "../../../data";
import { DialogFilter } from "../enums/playerRankingsEnums";

const DialogRole = ({ dialogFilter }: { dialogFilter: DialogFilter }) => {
  return (
    <RadioGroupWrapper dialogFilter={dialogFilter}>
      <FormControlLabel value="ALL" control={<Radio />} label="ALL" />
      {ROLES.map((role) => {
        return (
          <FormControlLabel
            key={role.role}
            value={role.role}
            control={<Radio />}
            label={role.value}
          />
        );
      })}
    </RadioGroupWrapper>
  );
};

export default DialogRole;
