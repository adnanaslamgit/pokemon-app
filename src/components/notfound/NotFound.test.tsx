import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

test("renders the 404 error message", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByText("404")).toBeInTheDocument();
  expect(screen.getByText(/Oh no! Pikachu couldn’t find the page you were looking for./i)).toBeInTheDocument();
});

test("renders Pikachu sad image", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  const image = screen.getByAltText("Sad Pikachu");
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", "sad-pickachu.png");
});

test("renders Back to Home button and navigates correctly", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  const homeButton = screen.getByRole("link", { name: /back to home/i });
  expect(homeButton).toBeInTheDocument();
  expect(homeButton).toHaveAttribute("href", "/");
});
