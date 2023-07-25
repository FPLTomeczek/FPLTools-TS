import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { MockStoreEnhanced } from "redux-mock-store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { PreloadedState } from "@reduxjs/toolkit";

import { AppStore, RootState, setupStore } from "../../../store/store";
import { Player } from "../../../store_features/players/players";

export const getMockPlayersProxies = (mockPlayers: Partial<Player>[]) => {
  const proxiesArr = [];
  for (const mockPlayer of mockPlayers) {
    proxiesArr.push(new Proxy(mockPlayer, proxyHandler));
  }
  return proxiesArr;
};

export const proxyHandler = {
  get(obj: Partial<Player>, prop: keyof Partial<Player>) {
    return prop in obj ? obj[prop] : "";
  },
};
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({
    children,
  }: PropsWithChildren<NonNullable<unknown>>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const renderComponent = (
  children: JSX.Element,
  store: MockStoreEnhanced<unknown, unknown> | ToolkitStore
) => {
  return render(<Provider store={store}>{children}</Provider>);
};

export const picks = [
  {
    _id: "64745179790c32d690e97b04",
    id: 81,
    web_name: "Raya",
    goals: 0,
    assists: 0,
    team: "BRE",
    element_type: "GK",
    total_points: 166,
    now_cost: 48,
    availability: null,
    __v: 0,
    position: 0,
    sellCost: 48,
  },
  {
    _id: "64745179790c32d690e97cb1",
    id: 357,
    web_name: "Trippier",
    goals: 0,
    assists: 9,
    team: "NEW",
    element_type: "DEF",
    total_points: 198,
    now_cost: 60,
    availability: 100,
    __v: 0,
    position: 1,
    sellCost: 59,
  },
  {
    _id: "64745179790c32d690e97b41",
    id: 586,
    web_name: "Estupiñán",
    goals: 0,
    assists: 7,
    team: "BHA",
    element_type: "DEF",
    total_points: 128,
    now_cost: 50,
    availability: 100,
    __v: 0,
    position: 2,
    sellCost: 48,
  },
  {
    _id: "64745179790c32d690e97cc5",
    id: 377,
    web_name: "Botman",
    goals: 0,
    assists: 2,
    team: "NEW",
    element_type: "DEF",
    total_points: 129,
    now_cost: 45,
    availability: 100,
    __v: 0,
    position: 3,
    sellCost: 45,
    removedPickIndex: 3,
  },
  {
    _id: "64745179790c32d690e97c64",
    id: 302,
    web_name: "Stones",
    goals: 0,
    assists: 2,
    team: "MCI",
    element_type: "DEF",
    total_points: 93,
    now_cost: 56,
    availability: 100,
    __v: 0,
    position: 4,
    sellCost: 56,
    removedPickIndex: 4,
  },
  {
    _id: "64745179790c32d690e97c8d",
    id: 335,
    web_name: "Rashford",
    goals: 0,
    assists: 7,
    team: "MUN",
    element_type: "MID",
    total_points: 205,
    now_cost: 72,
    availability: 100,
    __v: 0,
    position: 5,
    sellCost: 68,
  },
  {
    _id: "64745179790c32d690e97cc8",
    id: 594,
    web_name: "Isak",
    goals: 0,
    assists: 2,
    team: "NEW",
    element_type: "FWD",
    total_points: 100,
    now_cost: 70,
    availability: 100,
    __v: 0,
    position: 10,
    sellCost: 69,
    removedPickIndex: 6,
  },
  {
    _id: "64745179790c32d690e97b2b",
    id: 107,
    web_name: "March",
    goals: 0,
    assists: 10,
    team: "BHA",
    element_type: "MID",
    total_points: 147,
    now_cost: 52,
    availability: 25,
    __v: 0,
    position: 7,
    sellCost: 52,
    removedPickIndex: 7,
  },
  {
    _id: "64745179790c32d690e97a93",
    id: 13,
    web_name: "Saka",
    goals: 0,
    assists: 12,
    team: "ARS",
    element_type: "MID",
    total_points: 202,
    now_cost: 80,
    availability: 75,
    __v: 0,
    position: 13,
    sellCost: 80,
    removedPickIndex: 8,
  },
  {
    _id: "64745179790c32d690e97c72",
    id: 318,
    web_name: "Haaland",
    goals: 0,
    assists: 9,
    team: "MCI",
    element_type: "FWD",
    total_points: 272,
    now_cost: 124,
    availability: 100,
    __v: 0,
    position: 9,
    sellCost: 119,
  },
  {
    _id: "64745179790c32d690e97b39",
    id: 124,
    web_name: "Mitoma",
    goals: 0,
    assists: 9,
    team: "BHA",
    element_type: "MID",
    total_points: 138,
    now_cost: 57,
    availability: 100,
    __v: 0,
    position: 6,
    sellCost: 55,
    removedPickIndex: 10,
  },
  {
    _id: "64745179790c32d690e97b54",
    id: 133,
    web_name: "Arrizabalaga",
    goals: 0,
    assists: 0,
    team: "CFC",
    element_type: "GK",
    total_points: 118,
    now_cost: 45,
    availability: 100,
    __v: 0,
    position: 11,
    sellCost: 45,
  },
  {
    _id: "64745179790c32d690e97a8d",
    id: 7,
    web_name: "Ødegaard",
    goals: 0,
    assists: 8,
    team: "ARS",
    element_type: "MID",
    total_points: 212,
    now_cost: 69,
    availability: 100,
    __v: 0,
    position: 12,
    sellCost: 69,
  },
  {
    _id: "64745179790c32d690e97d2a",
    id: 427,
    web_name: "Kane",
    goals: 0,
    assists: 9,
    team: "TOT",
    element_type: "FWD",
    total_points: 263,
    now_cost: 115,
    availability: 100,
    __v: 0,
    position: 8,
    sellCost: 115,
  },
  {
    _id: "64745179790c32d690e97b08",
    id: 85,
    web_name: "Henry",
    goals: 0,
    assists: 3,
    team: "BRE",
    element_type: "DEF",
    total_points: 112,
    now_cost: 44,
    availability: 100,
    __v: 0,
    position: 14,
    sellCost: 44,
  },
];
