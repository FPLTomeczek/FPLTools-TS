import { Box, RadioGroup } from "@mui/material";
import { DialogFilter } from "../enums/playerRankingsEnums";
import { useContext } from "react";
import { PlayerRankingsContext } from "../context/PlayerRankingsContext";

const RadioGroupWrapper = ({
  children,
  dialogFilter,
}: {
  children: React.ReactNode;
  dialogFilter: DialogFilter;
}) => {
  const { playersRankingsFilters, filterPlayerRankings } = useContext(
    PlayerRankingsContext
  );

  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    dialogFilter: DialogFilter
  ) => {
    const value = e.target.value as string;
    filterPlayerRankings({
      ...playersRankingsFilters,
      [dialogFilter]: value,
    });
  };

  const getRadioGroupValue = (dialogFilter: DialogFilter) => {
    switch (dialogFilter) {
      case DialogFilter.NAME:
        return playersRankingsFilters.name;
      case DialogFilter.TEAM:
        return playersRankingsFilters.team;
      case DialogFilter.ROLE:
        return playersRankingsFilters.role;
      case DialogFilter.PROBABILITY:
        return playersRankingsFilters.probability;
      case DialogFilter.PRICE:
        return playersRankingsFilters.price;
      default:
        return "";
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
      <RadioGroup
        aria-labelledby="probability"
        name="controlled-radio-buttons-probability"
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
