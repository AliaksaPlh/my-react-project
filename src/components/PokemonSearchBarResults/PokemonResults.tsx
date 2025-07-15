import React from 'react';
import type { Pokemon } from '../../types_interfaces/interfaces';
import styles from './PokemonResults.module.css';
import Loader from '../Loader/Loader';

type Props = {
  loading: boolean;
  error: string | null;
  currentPokemon: Pokemon | null;
  allPokemons: Pokemon[];
};

const PokemonResults: React.FC<Props> = ({
  loading,
  error,
  currentPokemon,
  allPokemons,
}) => {
  if (loading) {
    return <Loader />;
  } else if (currentPokemon) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.pokemonName}>{currentPokemon.name}</h2>
        <img
          src={currentPokemon.sprites.front_default}
          alt={currentPokemon.name}
          className={styles.image}
        />
        <p>Height: {currentPokemon.height}</p>
        <p>Weight: {currentPokemon.weight}</p>
        <p>Types: {currentPokemon.types.map((t) => t.type.name).join(', ')}</p>
      </div>
    );
  } else if (allPokemons.length > 0) {
    return (
      <div className="pokemonResults">
        <h3>All Pokémons: name and type</h3>
        <ul className={styles.list}>
          {allPokemons.map((p) => (
            <li key={p.name} className={styles.listItem}>
              <img src={p.sprites.front_default} alt={p.name} />
              <div className="pokemonDetailsBlocks">
                <strong>{p.name}</strong>
                <p> {p.types.map((t) => t.type.name).join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return null;
};

export default PokemonResults;
