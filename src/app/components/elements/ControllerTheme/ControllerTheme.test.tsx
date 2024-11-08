import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ControllerTheme } from "./ControllerTheme";

describe("ControllerTheme component", () => {
  const mockProps = {
    text: "Click me!",
    onClick: jest.fn(),
  };
  test("should render without crashing", () => {
    render(<ControllerTheme />);
    expect(screen.getByText(mockProps.text)).toBeTruthy();
  });

  test("should can click in controller theme", () => {
    render(<ControllerTheme />);
    fireEvent.click(screen.getByText(mockProps.text));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  test("should can't click in controller theme", () => {
    render(<ControllerTheme disabled/>);
    userEvent.click(screen.getByText(mockProps.text));
    expect(screen.getByText(mockProps.text).closest("input")).toHaveAttribute(
      "disabled"
    );
  });
});
