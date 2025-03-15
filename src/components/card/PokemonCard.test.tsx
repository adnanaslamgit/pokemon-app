import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PokemonCard from "./PokemonCard";

const mockPokemon = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      },
    },
  },
  abilities: [
    { ability: { name: "static" } },
    { ability: { name: "lightning-rod" } },
  ],
};

describe("PokemonCard Component", () => {
  test("renders Pokemon card with correct details", () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>
    );

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByAltText("pikachu")).toHaveAttribute("src", mockPokemon.sprites.other["official-artwork"].front_default);
    expect(screen.getByText(/Height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 60/i)).toBeInTheDocument();
    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
  });
});
export {};