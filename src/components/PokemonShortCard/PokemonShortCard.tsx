import React from 'react';
import type { Pokemon } from '../../types_interfaces/interfaces';
import { useAppSelector } from '../../Hooks/useAppSelector';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { addSelectedPokemon, removeSelectedPokemon } from '../../store/slice';
import styles from './PokemonShortCard.module.css';

type Props = {
  pokemon: Pokemon;
  onItemClick: (name: string) => void;
};

const PokemonShortCard: React.FC<Props> = ({ pokemon, onItemClick }) => {
  const dispatch = useAppDispatch();

  const selectedPokemons = useAppSelector((state) => state.pokemon.selected);

  const isSelected = selectedPokemons.some((p) => p.name === pokemon.name);

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(removeSelectedPokemon(pokemon.name));
    } else {
      dispatch(addSelectedPokemon(pokemon));
    }
  };
  return (
    <li
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={() => onItemClick?.(pokemon.name)}
      style={{ cursor: 'pointer' }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="pokemonDetailsBlocks">
        <strong>{pokemon.name}</strong>
        <p> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      </div>
    </li>
  );
};
export default PokemonShortCard;
