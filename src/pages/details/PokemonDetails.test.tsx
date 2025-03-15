import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";

global.fetch = jest.fn();

const renderWithProviders = (name: string) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }, 
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/pokemon/${name}`]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("PokemonDetails Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(() => {}) 
    );

    renderWithProviders("pikachu");

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state when API fails", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject(new Error("API Error")),
      })
    );

    renderWithProviders("pikachu");

    await waitFor(() => {
      expect(screen.getByTestId("alert")).toBeInTheDocument();
      expect(screen.getByTestId("alert")).toHaveTextContent("Error fetching Pokemon data.");
    });
  });

  test("renders Pokemon details correctly when API succeeds", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "pikachu",
            height: 4,
            weight: 60,
            sprites: {
              other: {
                "official-artwork": {
                  front_default: "https://example.com/pikachu.png",
                },
              },
            },
          }),
      })
    );

    renderWithProviders("pikachu");

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /pikachu/i })).toBeInTheDocument();
    });

    expect(screen.getByText("Height: 4")).toBeInTheDocument();
    expect(screen.getByText("Weight: 60")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /pikachu/i })).toHaveAttribute("src", "https://example.com/pikachu.png");
  });

  test("renders fallback image when API response lacks artwork", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "pikachu",
            height: 4,
            weight: 60,
            sprites: {},
          }),
      })
    );

    renderWithProviders("pikachu");

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /pikachu/i })).toBeInTheDocument();
    });

    expect(screen.getByRole("img")).toHaveAttribute("src", "/placeholder.png");
  });
});
