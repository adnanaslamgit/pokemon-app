import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Home";
import { usePokemon } from "../../hooks/usePokemon";

// Mocking the `usePokemon` custom hook
jest.mock("../../hooks/usePokemon", () => ({
  usePokemon: jest.fn(),
}));

// Create a test QueryClient
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Prevent retrying failed queries in tests
      },
    },
  });

// Mock Pokémon data with Squirtle added
const mockPokemonData = [
  {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    sprites: {
      other: {
        ["official-artwork"]: {
          front_default: "https://example.com/bulbasaur.png",
        },
      },
    },
  },
  {
    id: 2,
    name: "charmander",
    height: 6,
    weight: 85,
    sprites: {
      other: {
        ["official-artwork"]: {
          front_default: "https://example.com/charmander.png",
        },
      },
    },
  },
  {
    id: 3,
    name: "squirtle",
    height: 5,
    weight: 90,
    sprites: {
      other: {
        ["official-artwork"]: {
          front_default: "https://example.com/squirtle.png",
        },
      },
    },
  },
];

const renderHome = () => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={createTestQueryClient()}>
        <Home />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("Home Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Home component", async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    });

    renderHome();

    expect(screen.getByText("Pokemon List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("🔍 Search Pokemon...")).toBeInTheDocument();
    expect(screen.getByText("🔠 Sort by Name")).toBeInTheDocument();
  });

  test("shows the loader while fetching data", () => {
    (usePokemon as jest.Mock).mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });
    
      renderHome();
      expect(screen.getByText("Loading Pokemon...")).toBeInTheDocument();
    });
    
  test("displays an error message on API failure", () => {
    (usePokemon as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    renderHome();
    expect(screen.getByText("Error loading Pokemon data!")).toBeInTheDocument();
  });

  test("filters Pokémon based on search input", async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    });

    renderHome();

    const searchInput = screen.getByPlaceholderText("🔍 Search Pokemon...");
    fireEvent.change(searchInput, { target: { value: "char" } });

    await waitFor(() => {
      expect(screen.getByText("charmander")).toBeInTheDocument();
      expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
      expect(screen.queryByText("squirtle")).not.toBeInTheDocument();
    });
  });

  test("sorts Pokémon by name", async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    });

    renderHome();

    const sortDropdown = screen.getByRole("combobox");
    fireEvent.change(sortDropdown, { target: { value: "name" } });

    await waitFor(() => {
      const pokemonNames = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent?.trim());
      expect(pokemonNames).toEqual(["bulbasaur", "charmander", "squirtle"]); // Sorted alphabetically
    });
  });

  test("sorts Pokémon by height", async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    });

    renderHome();

    const sortDropdown = screen.getByRole("combobox");
    fireEvent.change(sortDropdown, { target: { value: "height" } });

    await waitFor(() => {
      const pokemonNames = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent?.trim());
      expect(pokemonNames).toEqual(["squirtle", "charmander", "bulbasaur"]); // Sorted by height
    });
  });

  test("sorts Pokémon by weight", async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    });

    renderHome();

    const sortDropdown = screen.getByRole("combobox");
    fireEvent.change(sortDropdown, { target: { value: "weight" } });

    await waitFor(() => {
      const pokemonNames = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent?.trim());
      expect(pokemonNames).toEqual(["bulbasaur", "charmander", "squirtle"]); // Sorted by weight
    });
  });

  test("handles pagination correctly", async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    });

    renderHome();

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(usePokemon).toHaveBeenCalledWith(20, 20); // Offset should increase
    });

    const prevButton = screen.getByText(/⬅️ Back/i); // Fixed text match
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(usePokemon).toHaveBeenCalledWith(20, 0); // Offset should decrease
    });
  });
});
