/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";
import { LayoutAbstract } from "./LayoutAbstract";
import { images } from "@/app/assets/images";

describe("LayoutAbstract", () => {
  beforeEach(() => {
    render(<LayoutAbstract>Test Children</LayoutAbstract>);
  });

  describe("Layout Structure", () => {
    test("renders the main layout structure", () => {
      const layout = screen.getByRole("main");
      expect(layout).toHaveClass(
        "w-screen min-h-screen flex items-start justify-between bg-background"
      );
    });

    test("renders the correct structure for the content area", () => {
      const contentContainer = screen.getByRole("complementary");
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass(
        "w-[50%] min-w-[450px] h-screen flex items-start justify-end bg-card max-[768px]:w-full max-[768px]:min-w-0"
      );

      const content = screen.getByRole("region");
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass(
        "w-full h-auto flex flex-col items-center justify-center gap-7 m-auto px-10 py-0"
      );
    });
  });

  describe("Components", () => {
    test("renders Snackbar component", () => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    test("renders ControllerTheme component", () => {
      const controllerTheme = screen.getByTestId("controller-theme");
      expect(controllerTheme).toBeInTheDocument();
      expect(controllerTheme).toHaveClass("absolute top-2 left-2");
    });

    test("renders Image component with correct alt and src attributes", () => {
      const image = screen.getByAltText("Image illustration");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", images.illustration);
    });
  });

  describe("Responsive Layout", () => {
    beforeAll(() => {
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query === "(max-width: 768px)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));
    });

    test("hides image container on small screens", () => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event("resize"));
      render(<LayoutAbstract>Test Children</LayoutAbstract>);

      const imageContainer = screen.queryByRole("img");
      expect(imageContainer).not.toBeInTheDocument();
    });
  });

  describe("Children Prop", () => {
    test("renders children correctly", () => {
      expect(screen.getByText("Test Children")).toBeInTheDocument();
    });

    test("renders different children components", () => {
      render(
        <LayoutAbstract>
          <div>Child Component 1</div>
          <div>Child Component 2</div>
        </LayoutAbstract>
      );
      expect(screen.getByText("Child Component 1")).toBeInTheDocument();
      expect(screen.getByText("Child Component 2")).toBeInTheDocument();
    });
  });

  test("ensures main layout area is accessible", () => {
    const mainLayout = screen.getByRole("main");
    expect(mainLayout).toHaveAttribute("aria-label", "main layout area");
  });

  test("Snackbar renders with default properties", () => {
    const snackbar = screen.getByRole("alert");
    expect(snackbar).toBeVisible();
  });

  test("matches snapshot", () => {
    const { container } = render(
      <LayoutAbstract>Test Children</LayoutAbstract>
    );
    expect(container).toMatchSnapshot();
  });
});
