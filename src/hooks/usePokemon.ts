import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonList = async (limit: number, offset: number) => {
  const { data } = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  const details = await Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const res = await axios.get(pokemon.url);
      return res.data;
    })
  );
  return details;
};

export const usePokemon = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ["pokemon", limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
