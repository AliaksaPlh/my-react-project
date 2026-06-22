import { setRequestLocale } from 'next-intl/server';
import MainLayout from '../(main)/MainLayout';
import SearchControls from '../../components/SearchControls/SearchControls';
import ServerPokemonDetails from '../../components/ServerPokemonDetails/ServerPokemonDetails';
import ServerPokemonResults from '../../components/ServerPokemonResults/ServerPokemonResults';
import SelectedPokemonList from '../../store/SelectedPokemonsBox/SelectedPokemonsBox';

type SearchParams = {
  page?: string | string[];
  search?: string | string[];
  selected?: string | string[];
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const currentPage = Math.max(Number(getParam(query.page) || '1'), 1);
  const searchTerm = (getParam(query.search) || '').trim().toLowerCase();
  const selectedName = getParam(query.selected);

  return (
    <MainLayout>
      <div className="pokemon-container split">
        <div className="left-section">
          <SearchControls
            initialSearchTerm={searchTerm}
            currentPage={currentPage}
          />
          <ServerPokemonResults
            searchTerm={searchTerm}
            currentPage={currentPage}
          />
        </div>
        {selectedName && (
          <div className="right-section">
            <ServerPokemonDetails name={selectedName} />
          </div>
        )}
      </div>
      <SelectedPokemonList />
    </MainLayout>
  );
}
