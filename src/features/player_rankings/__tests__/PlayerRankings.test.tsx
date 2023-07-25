import { describe } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

import {
  getMockPlayersProxies,
  renderComponent,
} from "../../../shared/utils/tests/utils";
import PlayerRankingsList from "../components/PlayerRankingsList";
import userEvent from "@testing-library/user-event";
import PlayerRankingsProvider from "../context/PlayerRankingsContext";
import PlayerRankingsFilters from "../components/PlayerRankingsFilters";
import { Player } from "../../../store_features/players/players";

describe("list filtering", () => {
  const mockStore = configureStore();

  const initialState = {
    players: {
      playersList: [...getMockPlayersProxies(mockPlayers)],
    },
  };
  const store = mockStore(initialState);

  it("should have 10 elements by default", () => {
    renderComponent(<PlayerRankingsList />, store);
    const playersInList = screen.getAllByTestId("player-ranking-item");
    expect(playersInList).toHaveLength(10);
  });

  it('should expand list after click on "Load More" button ', async () => {
    const user = userEvent.setup();
    renderComponent(
      <PlayerRankingsProvider>
        <PlayerRankingsList />
      </PlayerRankingsProvider>,
      store
    );
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    await user.click(loadMoreButton);
    const playersInList = await screen.findAllByTestId("player-ranking-item");
    expect(playersInList).toHaveLength(11);
  });

  it("should return players for score chance in descending order", async () => {
    const user = userEvent.setup();
    renderComponent(
      <PlayerRankingsProvider>
        <PlayerRankingsFilters />
        <PlayerRankingsList />
      </PlayerRankingsProvider>,
      store
    );
    const probabilityButton = screen.getByRole("button", {
      name: /show: score%/i,
    });
    await user.click(probabilityButton);
    const scoringChanceButton = screen.getByText(/scoring chance/i);
    await user.click(scoringChanceButton);
    const playersScoringChanceElement = await screen.findAllByTestId(
      "player-scoring-chance"
    );
    const scoringChanceList = playersScoringChanceElement.map((node) =>
      Number(node.textContent)
    );

    const isSorted = scoringChanceList.every((value, ind) => {
      if (ind === 0) {
        return true;
      } else {
        return value <= scoringChanceList[ind - 1];
      }
    });
    expect(isSorted).toBeTruthy();
  });

  it("should return players only from BHA", async () => {
    const user = userEvent.setup();
    renderComponent(
      <PlayerRankingsProvider>
        <PlayerRankingsFilters />
        <PlayerRankingsList />
      </PlayerRankingsProvider>,
      store
    );

    const teamsButtonFilter = screen.getByRole("button", {
      name: /teams: all/i,
    });
    await user.click(teamsButtonFilter);
    const teamButton = screen.getByText(/bha/i);
    await user.click(teamButton);
    const playersInList = screen.getAllByTestId("player-ranking-item");
    expect(playersInList).toHaveLength(3);
  });

  it("should return only Goalkeepers", async () => {
    const user = userEvent.setup();
    renderComponent(
      <PlayerRankingsProvider>
        <PlayerRankingsFilters />
        <PlayerRankingsList />
      </PlayerRankingsProvider>,
      store
    );
    const rolesButtonFilter = screen.getByRole("button", {
      name: /roles: all/i,
    });
    await user.click(rolesButtonFilter);
    const roleButton = screen.getByText(/goalkeeper/i);
    await user.click(roleButton);
    const playersInList = screen.getAllByTestId("player-ranking-item");
    expect(playersInList).toHaveLength(2);
  });

  it("should return players under defined price", async () => {
    const user = userEvent.setup();
    renderComponent(
      <PlayerRankingsProvider>
        <PlayerRankingsFilters />
        <PlayerRankingsList />
      </PlayerRankingsProvider>,
      store
    );
    const priceButton = screen.getByRole("button", {
      name: /price: <13£/i,
    });
    await user.click(priceButton);
    const slider = screen.getByRole("slider");

    fireEvent.input(slider, {
      target: {
        value: 70,
      },
    });

    const playersInList = screen.getAllByTestId("player-ranking-item");
    expect(playersInList).toHaveLength(6);
  });

  it('should return player named "Trippier" ', async () => {
    const user = userEvent.setup();
    renderComponent(
      <PlayerRankingsProvider>
        <PlayerRankingsFilters />
        <PlayerRankingsList />
      </PlayerRankingsProvider>,
      store
    );
    const playerNameInput = screen.getByRole("textbox");
    await user.type(playerNameInput, "trippier");
    const playersInList = screen.getAllByTestId("player-ranking-item");
    expect(playersInList).toHaveLength(1);
    expect(screen.getByText(/trippier/i)).toBeTruthy();
  });

  it("should reset filters", async () => {
    const user = userEvent.setup();
    renderComponent(
      <PlayerRankingsProvider>
        <PlayerRankingsFilters />
      </PlayerRankingsProvider>,
      store
    );

    const rolesButtonFilter = screen.getByRole("button", {
      name: /roles: all/i,
    });
    await user.click(rolesButtonFilter);
    const roleButton = screen.getByText(/goalkeeper/i);
    await user.click(roleButton);
    await user.click(screen.getByRole("button", { name: /close/i }));
    const teamsButtonFilter = await screen.findByRole("button", {
      name: /teams: all/i,
    });
    await user.click(teamsButtonFilter);
    const teamButton = screen.getByText(/bha/i);
    await user.click(teamButton);
    await user.click(screen.getByRole("button", { name: /close/i }));
    const resetFilter = await screen.findByTestId("reset-filters-button");

    await user.click(resetFilter);

    expect(
      await screen.findByRole("button", { name: /roles: all/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /teams: all/i })
    ).toBeInTheDocument();
  });
});

const mockPlayers: Partial<Player>[] = [
  {
    id: 1,
    web_name: "Raya",
    team: "BRE",
    scoring_chance: 0,
    element_type: "GK",
    now_cost: 20,
  },
  {
    id: 2,
    web_name: "Trippier",
    team: "NEW",
    scoring_chance: 30,
    element_type: "GK",
    now_cost: 30,
  },
  {
    id: 3,
    web_name: "Estupiñán",
    team: "BHA",
    scoring_chance: 60,
    element_type: "DEF",
    now_cost: 40,
  },
  {
    id: 4,
    web_name: "A",
    team: "BHA",
    scoring_chance: 5,
    element_type: "DEF",
    now_cost: 50,
  },
  {
    id: 5,
    web_name: "B",
    team: "ARS",
    scoring_chance: 10,
    element_type: "DEF",
    now_cost: 60,
  },
  {
    id: 6,
    web_name: "C",
    team: "NEW",
    scoring_chance: 15,
    element_type: "DEF",
    now_cost: 70,
  },
  {
    id: 7,
    web_name: "D",
    team: "MUN",
    scoring_chance: 20,
    element_type: "MID",
    now_cost: 80,
  },
  {
    id: 8,
    web_name: "E",
    team: "MCI",
    scoring_chance: 25,
    element_type: "MID",
    now_cost: 90,
  },
  {
    id: 9,
    web_name: "F",
    team: "BHA",
    scoring_chance: 20,
    element_type: "MID",
    now_cost: 100,
  },
  {
    id: 10,
    web_name: "G",
    team: "CFC",
    scoring_chance: 15,
    element_type: "MID",
    now_cost: 130,
  },
  {
    id: 11,
    web_name: "H",
    team: "CRY",
    scoring_chance: 10,
    element_type: "FWD",
    now_cost: 120,
  },
];
