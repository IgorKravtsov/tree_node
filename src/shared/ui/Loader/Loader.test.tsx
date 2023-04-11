import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  test("Test render", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
