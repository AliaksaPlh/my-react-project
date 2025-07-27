import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SearchBar } from '../SearchBar/SearchBar';
import PokemonResults from '../PokemonSearchBarResults/PokemonResults';
import type { Pokemon } from '../../types_interfaces/interfaces';
import ErrorBoundaryButton from '../ErrorBoundary/ErrorBoundaryButton';
import './PokemonContainer.css';
import Pagination from '../Pagination/Pagination';
import { fetchPokemonByName, fetchPokemonsPage } from '../../api/pokemon';
import { useSearchTerm } from '../../Hooks/useSerchTerm';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

const PokemonContainer: React.FC = () => {
  const [term, setTerm] = useSearchTerm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [searchParams, setSearchParams] = useSearchParams(); // for URL

  const currentPage = Number(searchParams.get('page')) || 1;

  const selectedName = searchParams.get('selected');

  useEffect(() => {
    if (term.trim()) {
      fetchPokemon(term.trim());
    } else {
      fetchAllPokemons(currentPage);
    }
  }, [currentPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = term.trim().toLowerCase();
    setSearchParams({}); // refresh
    if (trimmed === '') {
      fetchAllPokemons();
    } else {
      fetchPokemon(trimmed);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchAllPokemons(newPage);
    setSearchParams({ page: newPage.toString() });
  };
  const handleItemClick = (name: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('selected', name);
    setSearchParams(newParams);
  };
  const handleCloseDetails = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('selected');
    setSearchParams(newParams);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPokemons = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    setCurrentPokemon(null);
    setAllPokemons([]);

    try {
      const detailedPokemons: Pokemon[] = await fetchPokemonsPage(page);
      setAllPokemons(detailedPokemons);
      setLoading(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pokemon-container split">
      <div className="left-section">
        <SearchBar
          value={term}
          onChange={handleChange}
          onSearch={handleSearch}
        />
        <PokemonResults
          loading={loading}
          error={error}
          currentPokemon={currentPokemon}
          allPokemons={allPokemons}
          onItemClick={handleItemClick}
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
      {selectedName && (
        <div className="right-section">
          <PokemonDetails name={selectedName} onClose={handleCloseDetails} />
        </div>
      )}
    </div>
  );
};

export default PokemonContainer;
