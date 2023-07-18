import { Slider } from "@mui/material";
import { useContext } from "react";
import styled from "styled-components";

import { PlayerRankingsContext } from "../context/PlayerRankingsContext";

const DialogPrice = ({ maxPrice }: { maxPrice: number }) => {
  const { filters, filter } = useContext(PlayerRankingsContext);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    //TODO: Event
    filter({
      ...filters,
      price: newValue as number,
    });
  };

  return (
    <DialogPriceStyled>
      <span className="dialog-price-value">
        {"<"}
        {filters.price / 10}
      </span>
      <Slider
        aria-label="Player price"
        value={filters.price}
        onChange={handlePriceChange}
        max={maxPrice}
        sx={{ color: "var(--secondary-color)" }}
      />
    </DialogPriceStyled>
  );
};

const DialogPriceStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .dialog-price-value {
    margin: 0 auto;
    font-size: 1.5rem;
  }
`;

export default DialogPrice;
