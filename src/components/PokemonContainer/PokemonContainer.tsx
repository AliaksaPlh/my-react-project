import { useState, useEffect } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import PokemonResults from '../PokemonSearchBarResults/PokemonResults';
import type { Pokemon } from '../../types_interfaces/interfaces';
import ErrorBoundaryButton from '../ErrorBoundary/ErrorBoundaryButton';
import './PokemonContainer.css';
import Pagination from '../Pagination/Pagination';
import { fetchPokemonByName, fetchPokemonsPage } from '../../api/pokemon';

const PokemonContainer: React.FC = () => {
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    setTerm(savedTerm);
    if (savedTerm.trim()) {
      fetchPokemon(savedTerm.trim());
    } else {
      fetchAllPokemons();
    }
  }, []);

  useEffect(() => {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    setTerm(savedTerm);
    if (savedTerm.trim()) {
      fetchPokemon(savedTerm.trim());
    } else {
      fetchAllPokemons();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = term.trim().toLowerCase();
    localStorage.setItem('searchTerm', trimmed);

    if (trimmed === '') {
      fetchAllPokemons();
    } else {
      fetchPokemon(trimmed);
    }
  };
  const handlePageChange = (newPage: number) => {
    fetchAllPokemons(newPage);
  };
  const fetchPokemon = async (name: string) => {
    setLoading(true);
    setError(null);
    setCurrentPokemon(null);
    setAllPokemons([]);

    try {
      const data: Pokemon = await fetchPokemonByName(name);
      setCurrentPokemon(data);
      setLoading(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setError(message);
      setLoading(false);
    }
  };

  const fetchAllPokemons = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    setCurrentPokemon(null);
    setAllPokemons([]);
    setCurrentPage(page);

    try {
      const detailedPokemons: Pokemon[] = await fetchPokemonsPage(page);
      setAllPokemons(detailedPokemons);
      setLoading(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setError(message);
      setLoading(false);
    }
  };
  return (
    <div className="pokemon-container">
      <SearchBar value={term} onChange={handleChange} onSearch={handleSearch} />
      <PokemonResults
        loading={loading}
        error={error}
        currentPokemon={currentPokemon}
        allPokemons={allPokemons}
      />
      {!currentPokemon &&
        Array.isArray(allPokemons) &&
        allPokemons.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      <ErrorBoundaryButton />
    </div>
  );
};

export default PokemonContainer;
