import { Box, RadioGroup } from "@mui/material";
import { useContext } from "react";

import { DialogFilter } from "../../../../features/player_rankings/enums/playerRankingsEnums";
import { PlayerRankingsContext } from "../../../../features/player_rankings/context/PlayerRankingsContext";

const RadioGroupWrapper = ({
  children,
  dialogFilter,
}: {
  children: React.ReactNode;
  dialogFilter: DialogFilter;
}) => {
  const { filters, filter, updateListCount } = useContext(
    PlayerRankingsContext
  );

  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    dialogFilter: DialogFilter
  ) => {
    const value = e.target.value as string;
    filter({
      ...filters,
      [dialogFilter]: value,
    });
    updateListCount(true, 10);
  };

  const getRadioGroupValue = (dialogFilter: DialogFilter) => {
    switch (dialogFilter) {
      case DialogFilter.NAME:
        return filters.name;
      case DialogFilter.TEAM:
        return filters.team;
      case DialogFilter.ROLE:
        return filters.role;
      case DialogFilter.PROBABILITY:
        return filters.probability;
      case DialogFilter.PRICE:
        return filters.price;
      default:
        return "";
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
      <RadioGroup
        aria-labelledby={`${dialogFilter}`}
        name={`controlled-radio-buttons-${dialogFilter}`}
        value={getRadioGroupValue(dialogFilter)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeFilter(e, dialogFilter)
        }
      >
        {children}
      </RadioGroup>
    </Box>
  );
};

export default RadioGroupWrapper;
