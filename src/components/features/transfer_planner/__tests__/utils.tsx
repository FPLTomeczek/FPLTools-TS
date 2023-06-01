import { Provider } from "react-redux";
import { render } from "@testing-library/react";

export const proxyHandler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : "";
  },
};

export const renderComponent = (children, store) => {
  return render(<Provider store={store}>{children}</Provider>);
};
