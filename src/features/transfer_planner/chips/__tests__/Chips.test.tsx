import { findByTestId, screen, waitFor } from "@testing-library/react";
import TransferPlanner from "../../../../pages/TransferPlanner";
import { renderWithProviders } from "../../../../shared/utils/tests/utils";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

describe("check app behavior after activating chip", () => {
  it("should make transfers unlimited by clicking wildcard chip", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransferPlanner />);
    const demoButton = screen.getByRole("button", { name: /demo/i });
    await user.click(demoButton);
    await waitFor(() => {
      expect(screen.getByTestId("transfers-value-span").textContent).toBe("2");
    });
    await user.click(screen.getByRole("button", { name: /wildcard/i }));
    expect(screen.getByTestId("infinite-transfers-span")).toBeInTheDocument();
  });

  it("should make transfers unlimited by clicking freehit chip", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransferPlanner />);
    const demoButton = screen.getByRole("button", { name: /demo/i });
    await user.click(demoButton);
    await waitFor(() => {
      expect(screen.getByTestId("transfers-value-span").textContent).toBe("2");
    });
    await user.click(screen.getByRole("button", { name: /free hit/i }));
    expect(screen.getByTestId("infinite-transfers-span")).toBeInTheDocument();
  });

  it("should add border to bench after activating bench boost", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransferPlanner />);
    const demoButton = screen.getByRole("button", { name: /demo/i });
    await user.click(demoButton);
    await waitFor(() => {
      expect(screen.getByTestId("transfers-value-span").textContent).toBe("2");
    });
    await user.click(screen.getByRole("button", { name: /bench boost/i }));
    expect(screen.getByTestId("bench")).toHaveStyle(
      "border: 6px solid rgb(2,239,255)"
    );
  });
});

describe("check app behavior after deactivating chip", () => {
  it("should display model on 2 click on chip", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransferPlanner />);
    const demoButton = screen.getByRole("button", { name: /demo/i });
    await user.click(demoButton);
    await waitFor(() => {
      expect(screen.getByTestId("transfers-value-span").textContent).toBe("2");
    });
    await user.click(screen.getByRole("button", { name: /wildcard/i }));
    await user.click(screen.getByRole("button", { name: /wildcard/i }));

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });
});
