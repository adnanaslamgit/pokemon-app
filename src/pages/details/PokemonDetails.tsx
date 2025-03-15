import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./PokemonDetails.module.scss";

const fetchPokemonDetails = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) throw new Error("Error fetching Pokemon data");
  return response.json();
};

const PokemonDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetails(name || ""),
    enabled: !!name,
  });

  if (isLoading)
    return <div className={styles.loading}>Loading...</div>;

  if (error)
    return <div className={styles.error} data-testid="alert">⚠ Error fetching Pokemon data.</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      {pokemon ? (
        <div className={styles.detailsCard}>
          <img
            src={pokemon.sprites?.other?.["official-artwork"]?.front_default || "/placeholder.png"}
            alt={pokemon.name}
            className={styles.pokemonImage}
          />
          <h1>{pokemon.name}</h1>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      ) : (
        <div className={styles.error} data-testid="alert">
          ⚠ Pokemon data not available.
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
