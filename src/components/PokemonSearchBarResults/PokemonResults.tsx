import React from 'react';
import type { Pokemon } from '../../types_interfaces/interfaces';
import styles from './PokemonResults.module.css';
import Loader from '../Loader/Loader';
import PokemonShortCard from '../PokemonShortCard/PokemonShortCard';

type Props = {
  loading: boolean;
  error: string | null;
  currentPokemon: Pokemon | null;
  allPokemons: Pokemon[];
  onItemClick: (name: string) => void;
};

const PokemonResults: React.FC<Props> = ({
  loading,
  error,
  currentPokemon,
  allPokemons,
  onItemClick,
}) => {
  if (loading) {
    return <Loader />;
  }
  if (currentPokemon) {
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
  }
  if (Array.isArray(allPokemons) && allPokemons.length) {
    return (
      <div className="pokemonResults">
        <h3 style={{ cursor: 'default' }}>All Pokémons: name and type</h3>
        <ul className={styles.list}>
          {allPokemons.map((p: Pokemon) => (
            <PokemonShortCard
              key={p.name}
              pokemon={p}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return null;
};

export default PokemonResults;
