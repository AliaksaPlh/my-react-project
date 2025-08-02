import React, { useEffect, useState } from 'react';
import { fetchPokemonByName } from '../../api/pokemon';
import type { Pokemon } from '../../types_interfaces/interfaces';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

interface Props {
  name: string;
  onClose: () => void;
}

const PokemonDetails: React.FC<Props> = ({ name, onClose }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonByName(name);
        setPokemon(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Failed to load details';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name]);

  if (loading) {
    return <Loader style={{ position: 'absolute', top: '40%' }} />;
  }
  if (error) {
    return <div className="details-error">{error}</div>;
  }
  if (!pokemon) {
    return null;
  }
  return (
    <div
      className="pokemon-details"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5px',
        margin: '10px',
        backgroundColor: '#f6bd2129',
        borderRadius: '8px',
        position: 'absolute',
        top: '10%',
        right: '10%',
      }}
    >
      <h2>{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="details-image"
      />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      <Button onClick={onClose} className="close-button">
        Close
      </Button>
    </div>
  );
};

export default PokemonDetails;
