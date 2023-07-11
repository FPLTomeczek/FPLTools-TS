import { Slider } from "@mui/material";
import { useContext } from "react";
import { PlayerRankingsContext } from "../context/PlayerRankingsContext";

const DialogPrice = ({ maxPrice }: { maxPrice: number }) => {
  const { playersRankingsFilters, filterPlayerRankings } = useContext(
    PlayerRankingsContext
  );

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    //TODO: Event
    filterPlayerRankings({
      ...playersRankingsFilters,
      price: newValue as number,
    });
  };

  return (
    <Slider
      aria-label="Player price"
      value={playersRankingsFilters.price}
      onChange={handlePriceChange}
      max={maxPrice}
    />
  );
};

export default DialogPrice;
