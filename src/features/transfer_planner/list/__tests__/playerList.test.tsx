import { it, expect, describe } from "vitest";
import { screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

import { getManagerTeam } from "../../service/getData";
import {
  renderComponent,
  proxyHandler,
  getMockPlayersProxies,
} from "../../../../tests/utils";
import PlayersList from "../PlayersList";
import { mockPlayer } from "../../../../tests/utils";
import { IS_SEASON_IN_PROGRESS } from "../../../../constants";

describe("fetching players", () => {
  it("team players are fetched", async () => {
    if (!IS_SEASON_IN_PROGRESS) {
      try {
        await getManagerTeam(7770);
      } catch (error) {
        expect(error).toBeDefined();
      }
    } else {
      const data = await getManagerTeam(7770);
      expect(data).toHaveLength(15);
    }
  });
});

describe("list filtering", () => {
  const mockStore = configureStore();

  const mockPlayers: mockPlayer[] = [
    { id: 1, web_name: "Raya", team: "BRE" },
    { id: 2, web_name: "Trippier", team: "NEW" },
    { id: 3, web_name: "Estupiñán", team: "BHA" },
  ];

  const initialState = {
    players: {
      playersList: [...getMockPlayersProxies(mockPlayers)],
      status: "success",
      error: null,
      playerFilters: { name: "", team: "BRE", role: "" },
      sortOptions: { type: "price", value: "desc" },
    },
    drafts: {
      managerTeam: [{ picks: [] }, {}],
      draftNumber: 0,
    },
  };

  describe("team filtering", () => {
    it("should return players from selected team", () => {
      const store = mockStore(initialState);

      renderComponent(<PlayersList />, store);

      const playerListItem = screen.getAllByTestId("player-team-item");

      expect(playerListItem.every((item) => item.textContent === "BRE")).toBe(
        true
      );
    });

    it("should not return any player when player doesnt belong to team", () => {
      const { players } = initialState;

      const store = mockStore({
        ...initialState,
        players: {
          ...players,
          playerFilters: { name: "", team: "ARS", role: "" },
        },
      });

      renderComponent(<PlayersList />, store);

      expect(screen.queryAllByTestId("player-team-item")).toHaveLength(0);
    });
  });

  describe("name filtering", () => {
    it(`should return player that contains string "TRIP" `, () => {
      const { players } = initialState;

      const store = mockStore({
        ...initialState,
        players: {
          ...players,
          playerFilters: { name: "TRIP", team: "ALL", role: "" },
        },
      });

      renderComponent(<PlayersList />, store);

      expect(screen.queryAllByTestId("player-team-item")).toHaveLength(1);
      expect(screen.getByText(/trippier/i)).toBeInTheDocument();
    });

    it(`should not return player that contains string "RAYE" `, () => {
      const { players } = initialState;

      const store = mockStore({
        ...initialState,
        players: {
          ...players,
          playerFilters: { name: "RAYE", team: "ALL", role: "" },
        },
      });

      renderComponent(<PlayersList />, store);

      expect(screen.queryAllByTestId("player-team-item")).toHaveLength(0);
    });
  });
});

describe("sorting table", () => {
  const mockStore = configureStore();

  const mockPlayers = [
    { id: 1, web_name: "Raya", team: "BRE", total_points: 20, now_cost: 50 },
    {
      id: 2,
      web_name: "Trippier",
      team: "NEW",
      total_points: 30,
      now_cost: 80,
    },
    {
      id: 3,
      web_name: "Estupiñán",
      team: "BHA",
      total_points: 15,
      now_cost: 120,
    },
  ];

  const initialState = {
    players: {
      playersList: [
        new Proxy(mockPlayers[0], proxyHandler),
        new Proxy(mockPlayers[1], proxyHandler),
        new Proxy(mockPlayers[2], proxyHandler),
      ],
      status: "success",
      error: null,
      playerFilters: { name: "", team: "ALL", role: "ALL" },
      sortOptions: { type: "points", value: "desc" },
    },
    drafts: {
      managerTeam: [{ picks: [] }, {}],
      draftNumber: 0,
    },
  };

  it("should return sorted players by points descending", () => {
    const store = mockStore(initialState);

    renderComponent(<PlayersList />, store);

    const points = screen
      .getAllByTestId("player-points-item")
      .map((item) => Number(item.textContent));

    expect(
      points.every((value, i) => {
        return i === 0 || value <= points[i - 1];
      })
    ).toBe(true);
  });

  it("should return sorted players by price ascending", () => {
    const { players } = initialState;

    const store = mockStore({
      ...initialState,
      players: {
        ...players,
        sortOptions: { type: "price", value: "asc" },
      },
    });

    renderComponent(<PlayersList />, store);

    const prices = screen
      .getAllByTestId("player-price-item")
      .map((item) => Number(item.textContent));

    expect(
      prices.every((value, i) => {
        return i === 0 || value >= prices[i - 1];
      })
    ).toBe(true);
  });
});
