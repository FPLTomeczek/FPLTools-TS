// import { screen, waitFor } from "@testing-library/react";
// import { describe, it, expect } from "vitest";
// import configureStore from "redux-mock-store";
// import Pitch from "../pitch/Pitch";
// import { renderComponent, picks } from "./utils";
// import userEvent from "@testing-library/user-event";
// import realStore from "../../../../app/store";

// describe("make change", () => {
//   // const mockStore = configureStore();

//   // const initialState = {
//   //   managerTeam: {
//   //     picks,
//   //     playerToChange: {},
//   //   },
//   //   fixtures: {
//   //     fixtureList: [],
//   //   },
//   // };

//   it("should change player between first eleven and bench", async () => {
//     const user = userEvent.setup();
//     const enterIDInput = screen.getByRole("textbox", {
//       name: /enter your id/i,
//     });
//     user.click(enterIDInput);
//     user.type(enterIDInput, "7770");
//     user.click(screen.getByRole("button", { name: /submit/i }));

//     await waitFor(() =>
//       expect(screen.getByTestId("pitch")).toBeInTheDocument()
//     );
//     renderComponent(<Pitch isLoading={false} />, realStore);
//     const changePlayer0Button = await screen.findByTestId("change-button-0");
//     const changePlayer11Button = await screen.findByTestId("change-button-11");

//     console.log(realStore);

//     await user.click(changePlayer0Button);
//     await user.click(changePlayer11Button);

//     const player0Name = screen.getByTestId("player-name-0");
//     const player11Name = screen.getByTestId("player-name-11");

//     expect(
//       player0Name.textContent === "Arrizabalaga" &&
//         player11Name.textContent === "Raya"
//     ).toBe(true);
//   });
// });
