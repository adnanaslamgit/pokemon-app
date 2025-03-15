import { Link } from "react-router-dom";
import styles from "./PokemonCard.module.scss"; 

interface PokemonProps {
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
  };
}

const PokemonCard: React.FC<PokemonProps> = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className={styles.card}>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <div className={styles.abilities}>
  {pokemon.abilities?.map((a, index) => (
    <span key={index}>{a.ability.name}</span>
  )) || <span>No abilities available</span>}
</div>
    </Link>
  );
};

export default PokemonCard;
