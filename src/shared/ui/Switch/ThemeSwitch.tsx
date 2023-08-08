import * as React from "react";
import Switch from "@mui/material/Switch";
import { useTheme } from "../../theme/ThemeProvider";

export function ThemeSwitch() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    toggleTheme();
  };

  const { toggleTheme } = useTheme();

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
