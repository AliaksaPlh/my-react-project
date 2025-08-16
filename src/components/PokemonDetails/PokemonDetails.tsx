import React from 'react';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import './PokemonDetails.css';
import { useGetPokemonByNameQuery } from '../../api/Query/pokemonApi';

interface Props {
  name: string;
  onClose: () => void;
}

const PokemonDetails: React.FC<Props> = ({ name, onClose }) => {
  const { data: pokemon, isFetching } = useGetPokemonByNameQuery(name);

  if (isFetching) {
    return <Loader className="loader" />;
  }
  if (!pokemon) {
    return null;
  }
  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        className="details-image"
      />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      <Button onClick={onClose} className="close-button secondary">
        Close
      </Button>
    </div>
  );
};

export default PokemonDetails;
