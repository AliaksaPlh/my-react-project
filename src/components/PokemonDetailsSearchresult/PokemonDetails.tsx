import React from 'react';
import Loader from '../Loader/Loader';
import './PokemonDetails.css';
import { useGetPokemonByNameQuery } from '../../api/Query/pokemonApi';

interface Props {
  name: string;
  children?: React.ReactNode;
}

const PokemonDetails: React.FC<Props> = ({ name, children }) => {
  const { data: pokemon, isFetching, isError } = useGetPokemonByNameQuery(name);

  if (isFetching) {
    return <Loader className="loader" />;
  }
  if (isError) {
    return <div>Error...</div>;
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
      {children}
    </div>
  );
};

export default PokemonDetails;
