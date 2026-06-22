'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';
import type { Pokemon } from '../../types_interfaces/interfaces';
import { useAppSelector } from '../../Hooks/useAppSelector';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { addSelectedPokemon, removeSelectedPokemon } from '../../store/slice';
import styles from './PokemonShortCard.module.css';
import { selectPokemons } from '../../store/slice';

type Props = {
  pokemon: Pokemon;
  onItemClick?: (name: string) => void;
};

const PokemonShortCard: React.FC<Props> = ({ pokemon, onItemClick }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPokemons = useAppSelector(selectPokemons);

  const isSelected = selectedPokemons.some((p) => p.name === pokemon.name);

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(removeSelectedPokemon(pokemon.name));
    } else {
      dispatch(addSelectedPokemon(pokemon));
    }
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(pokemon.name);
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('selected', pokemon.name);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <li
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={handleItemClick}
      style={{ cursor: 'pointer' }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <Image
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        width={80}
        height={80}
      />
      <div className="pokemonDetailsBlocks">
        <strong>{pokemon.name}</strong>
        <p> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      </div>
    </li>
  );
};
export default PokemonShortCard;
