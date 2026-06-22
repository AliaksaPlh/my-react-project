'use client';

import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import ErrorBoundaryButton from '../ErrorBoundary/ErrorBoundaryButton';
import Pagination from '../Pagination/Pagination';
import { SearchBar } from '../SearchBar/SearchBar';
import useLocalStorage from '../../Hooks/useLocalStorage';

type Props = {
  initialSearchTerm: string;
  currentPage: number;
};

export default function SearchControls({
  initialSearchTerm,
  currentPage,
}: Props) {
  const [term, setTerm] = useState(initialSearchTerm);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('Search');
  const { setLocalStorage } = useLocalStorage('term');

  const updateSearchParams = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleSearch = () => {
    const trimmed = term.trim().toLowerCase();
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    params.delete('selected');
    setLocalStorage(trimmed);

    if (trimmed) {
      params.set('search', trimmed);
    } else {
      params.delete('search');
    }

    updateSearchParams(params);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    params.delete('selected');
    updateSearchParams(params);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SearchBar
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          onSearch={handleSearch}
          placeholder={t('placeholder')}
          buttonLabel={t('button')}
        />
      </form>
      {!searchParams.get('search') && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          label={t('page', { page: currentPage })}
          previousLabel={t('previous')}
          nextLabel={t('next')}
        />
      )}
      <ErrorBoundaryButton />
    </>
  );
}
