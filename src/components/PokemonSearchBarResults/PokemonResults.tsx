'use client';

import React from 'react';
import Image from 'next/image';
import type { Pokemon } from '../../types_interfaces/interfaces';
import styles from './PokemonResults.module.css';
import Loader from '../Loader/Loader';
import PokemonShortCardsList from '../PokemonShortCardsList/PokemonShortCardsList';
import {
  useGetPokemonByPageQuery,
  useGetPokemonByNameQuery,
} from '../../api/Query/pokemonApi';
type Props = {
  term: string;
  currentPage: number;
  currentPokemon?: Pokemon | null;
  onItemClick: (name: string) => void;
};

const PokemonResults: React.FC<Props> = ({
  term,
  currentPage,
  onItemClick,
}) => {
  const {
    data: currentPokemon,
    error: searchError,
    isFetching: isFetchingByName,
  } = useGetPokemonByNameQuery(term, { skip: !term });

  const {
    data: allPokemons,
    error: pageError,
    isFetching,
    isLoading,
  } = useGetPokemonByPageQuery(
    { offset: (currentPage - 1) * 20, limit: 20 },
    { skip: !!term }
  );

  if (term && isFetchingByName) return <Loader />;
  if (!term && (isFetching || isLoading)) return <Loader />;
  if (searchError || pageError)
    return <p className={styles.error}>Error, check the name.</p>;

  if (term && !isFetchingByName && currentPokemon) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.pokemonName}>{currentPokemon.name}</h2>
        <Image
          src={currentPokemon.sprites.other.dream_world.front_default}
          alt={currentPokemon.name}
          width={300}
          height={300}
          className={styles.image}
        />
        <div className={styles.pokemonInfo}>
          <p>Order: {currentPokemon.id}</p>
          <p>Height: {currentPokemon.height}</p>
          <p>Weight: {currentPokemon.weight}</p>
          <p>
            Types: {currentPokemon.types.map((t) => t.type.name).join(', ')}
          </p>
        </div>
      </div>
    );
  }
  if (!term && allPokemons && 'results' in allPokemons) {
    return (
      <div className="pokemonResults">
        <h3 style={{ cursor: 'default' }}>All Pokémons: name and type</h3>
        <ul className={styles.list}>
          {allPokemons.results.map((p: { name: string }) => {
            return (
              <PokemonShortCardsList
                key={p.name}
                name={p.name}
                onItemClick={onItemClick}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
};

export default PokemonResults;
