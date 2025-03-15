import { render, screen } from "@testing-library/react";
import Loader from "./Loader";
import pokeball from "../../assets/pokeball.png";

describe("Loader Component", () => {
  test("renders the loader container", () => {
    render(<Loader />);
    
    const loaderContainer = screen.getByTestId("loader-container");
    expect(loaderContainer).toBeInTheDocument();
  });

  test("displays the loading text", () => {
    render(<Loader />);
    
    const loadingText = screen.getByText(/Loading Pokemon.../i);
    expect(loadingText).toBeInTheDocument();
  });

  test("displays the loading image", () => {
    render(<Loader />);
    
    const loaderImage = screen.getByAltText("Loading...");
    expect(loaderImage).toBeInTheDocument();
    expect(loaderImage).toHaveAttribute("src", pokeball);
  });
});


export {};