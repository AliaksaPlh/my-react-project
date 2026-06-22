'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';
import { SearchBar } from '../SearchBar/SearchBar';
import PokemonResults from '../PokemonSearchBarResults/PokemonResults';
import ErrorBoundaryButton from '../ErrorBoundary/ErrorBoundaryButton';
import './PokemonContainer.css';
import Pagination from '../Pagination/Pagination';
import useLocalStorage from '../../Hooks/useLocalStorage';
import PokemonDetailsModule from '../PokemonDetailsModule/PokemonDetailsModule';

const PokemonContainer: React.FC = () => {
  const [term, setTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { setLocalStorage } = useLocalStorage('term');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const selectedName = searchParams.get('selected');

  const updateSearchParams = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = term.trim().toLowerCase();
    setLocalStorage(trimmed);
    setSearchTerm(trimmed);

    if (trimmed === '') {
      updateSearchParams(new URLSearchParams());
    } else {
      updateSearchParams(new URLSearchParams({ search: trimmed }));
    }
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    updateSearchParams(newParams);
  };
  const handleItemClick = (name: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('selected', name);
    updateSearchParams(newParams);
  };
  const handleCloseDetails = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('selected');
    updateSearchParams(newParams);
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
          term={searchTerm}
          currentPage={currentPage}
          onItemClick={handleItemClick}
        />
        {!searchParams.get('search') && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <ErrorBoundaryButton />
      </div>
      {selectedName && (
        <div className="right-section">
          <PokemonDetailsModule
            name={selectedName}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </div>
  );
};

export default PokemonContainer;
