import { useState, useMemo } from "react";
import Loader from "../../components/loader/Loader";
import { usePokemon } from "../../hooks/usePokemon";
import PokemonCard from "../../components/card/PokemonCard";
import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchbar/SearchBar";
import SortDropdown from "../../components/sort/SortDropdown";

const Home = () => {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");

  const { data, isLoading, error } = usePokemon(limit, offset);

  const filteredSortedPokemon = useMemo(() => {
    const pokemonList = data || []; // Ensure data is always an array

    return pokemonList
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortKey === "name") return a.name.localeCompare(b.name);
        if (sortKey === "height") return a.height - b.height;
        if (sortKey === "weight") return a.weight - b.weight;
        return 0
      });
  }, [data, searchTerm, sortKey]);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Pokemon List</h1>

      <div className="flex justify-between mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortDropdown sortKey={sortKey} setSortKey={setSortKey} />
      </div>

      {error ? (
        <p className="text-red-500 text-center text-lg">Error loading Pokemon data!</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredSortedPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <Pagination limit={limit} offset={offset} setOffset={setOffset} />
        </>
      )}
    </div>
  );
};

export default Home;
