import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { MockStoreEnhanced } from "redux-mock-store";

export interface mockPlayer {
  id: number;
  web_name: string;
  team: string;
}

export const proxyHandler = {
  get(obj: mockPlayer, prop: keyof mockPlayer) {
    return prop in obj ? obj[prop] : "";
  },
};

export const renderComponent = (
  children: JSX.Element,
  store: MockStoreEnhanced<unknown, unknown>
) => {
  return render(<Provider store={store}>{children}</Provider>);
};
