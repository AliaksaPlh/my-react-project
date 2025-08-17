import React from 'react';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import './PokemonDetailsModule.css';
import { useGetPokemonByNameQuery } from '../../api/Query/pokemonApi';
import PokemonDetails from '../PokemonDetailsSearchresult/PokemonDetails';

interface Props {
  name: string;
  onClose: () => void;
}

const PokemonDetailsModule: React.FC<Props> = ({ name, onClose }) => {
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
    <PokemonDetails name={pokemon.name}>
      <Button onClick={onClose} className="close-button secondary">
        Close
      </Button>
    </PokemonDetails>
  );
};

export default PokemonDetailsModule;
