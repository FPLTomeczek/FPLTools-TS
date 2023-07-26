import { render, screen } from "@testing-library/react";

import SingleFutureFixture from "../components/SingleFutureFixture";
import { MEGA_DIFF_COLOR } from "../../../../shared/utils/constants";

describe("single fixture has desired bg color", () => {
  it("should have background fixture color set to mega", () => {
    render(<SingleFutureFixture opponent="ARS" isHome={true} difficulty={5} />);
    const singleFixtureItem = screen.getByTestId("single-fixture-item");
    expect(singleFixtureItem).toHaveStyle(
      `background-color: ${MEGA_DIFF_COLOR}`
    );
  });

  it("should have text uppercase if fixture is home", () => {
    render(<SingleFutureFixture opponent="ARS" isHome={true} difficulty={2} />);
    const singleFixtureItem = screen.getByTestId("single-fixture-item");
    expect(singleFixtureItem).toHaveStyle("text-transform: uppercase");
  });

  it("should have text lowercase if fixture is away", () => {
    render(
      <SingleFutureFixture opponent={"ARS"} isHome={false} difficulty={2} />
    );
    const singleFixtureItem = screen.getByTestId("single-fixture-item");
    expect(singleFixtureItem).toHaveStyle("text-transform: lowercase");
  });

  it("should have text uppercase with given opponent", () => {
    render(<SingleFutureFixture opponent="NEW" isHome={true} difficulty={2} />);
    const singleFixtureItem = screen.getByTestId("single-fixture-item");
    expect(singleFixtureItem.textContent).toBe("NEW");
    expect(singleFixtureItem).toHaveStyle("text-transform: uppercase");
  });
});
