import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../../../shared/utils/tests/utils";
import TransferPlanner from "../../../../pages/TransferPlanner";

describe("make picks manipulation", () => {
  beforeEach(async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransferPlanner />);
    const demoButton = screen.getByRole("button", { name: /demo/i });
    await user.click(demoButton);
  });

  it("should remove player from picks", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("RemoveIcon-0")).toBeInTheDocument();
    });
    const user = userEvent.setup();
    const removeIcon = screen.getByTestId("RemoveIcon-0");
    await user.click(removeIcon);
    expect(screen.getByText(/blank/i)).toBeInTheDocument();
  });

  it("should switch picks between bench and first eleven", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("SwitchIcon-1")).toBeInTheDocument();
    });
    const user = userEvent.setup();
    const firstElevenPlayerName = screen.getByTestId("pick-name-1").textContent;
    const benchPlayerName = screen.getByTestId("pick-name-14").textContent;
    const switchIconFirstElevenPick = screen.getByTestId("SwitchIcon-1");
    await user.click(switchIconFirstElevenPick);
    const switchIconBenchPick = screen.getByTestId("SwitchIcon-14");
    await user.click(switchIconBenchPick);
    expect(screen.getByTestId("pick-name-1").textContent).toEqual(
      benchPlayerName
    );
    expect(screen.getByTestId("pick-name-14").textContent).toEqual(
      firstElevenPlayerName
    );
  });
});
