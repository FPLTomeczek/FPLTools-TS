import { screen, act } from "@testing-library/react";
import { vitest } from "vitest";
import configureStore from "redux-mock-store";

import CalendarTimer from "../components/CalendarTimer";
import { renderComponent } from "../../../shared/utils/tests/utils";

describe("CalendarTimer", () => {
  beforeEach(() => {
    vitest.useFakeTimers();
  });

  afterEach(() => {
    vitest.runOnlyPendingTimers();
    vitest.useRealTimers();
  });

  const initialState = {
    gameweeks: {
      deadline: "2023-08-11T17:30:00Z",
    },
  };
  const mockStore = configureStore();

  test("displays the updated current date every second", () => {
    const store = mockStore(initialState);
    renderComponent(<CalendarTimer />, store);
    const currentSecondsElement = screen.getByTestId("timer-seconds");
    const firstTimer = Number(currentSecondsElement.textContent);

    // // Advance the time by 1 second
    act(() => {
      vitest.advanceTimersByTime(1000);
    });

    if (firstTimer !== 0) {
      expect(Number(currentSecondsElement.textContent)).toBe(firstTimer - 1);
    } else {
      expect(Number(currentSecondsElement.textContent)).toBe(59);
    }

    // Advance the time by 5 seconds
    act(() => {
      vitest.advanceTimersByTime(5000);
    });

    if (firstTimer > 5) {
      expect(Number(currentSecondsElement.textContent)).toBe(firstTimer - 6);
    } else {
      expect(Number(currentSecondsElement.textContent)).toBeGreaterThan(53);
    }
  });
});
