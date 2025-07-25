import { Component } from 'react';
import type { ChangeEvent } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import PokemonResults from '../PokemonSearchBarResults/PokemonResults';
import type { Pokemon } from '../../types_interfaces/interfaces';
import ErrorBoundaryButton from '../ErrorBoundary/ErrorBoundaryButton';
import './PokemonContainer.css';
import Pagination from '../Pagination/Pagination';
import { fetchPokemonByName, fetchPokemonsPage } from '../../api/pokemon';

type State = {
  term: string;
  loading: boolean;
  error: string | null;
  currentPokemon: Pokemon | null;
  allPokemons: Pokemon[];
  currentPage: number;
};
type Props = {
  title?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  func?: (inputValue: string) => void;
};

export class PokemonContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      term: '',
      loading: false,
      error: null,
      currentPokemon: null,
      allPokemons: [],
      currentPage: 1,
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ term: savedTerm }, () => {
      if (savedTerm.trim()) {
        this.fetchPokemon(savedTerm.trim());
      } else {
        this.fetchAllPokemons();
      }
    });
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ term: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.term.trim().toLowerCase();
    localStorage.setItem('searchTerm', trimmed);

    if (trimmed === '') {
      this.fetchAllPokemons();
    } else {
      this.fetchPokemon(trimmed);
    }
  };
  handlePageChange = (newPage: number) => {
    this.fetchAllPokemons(newPage);
  };

  fetchPokemon = async (name: string) => {
    this.setState({
      loading: true,
      error: null,
      currentPokemon: null,
      allPokemons: [],
    });

    try {
      const data: Pokemon = await fetchPokemonByName(name);
      this.setState({ currentPokemon: data, loading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      this.setState({ error: message, loading: false });
    }
  };

  fetchAllPokemons = async (page: number = 1) => {
    this.setState({
      loading: true,
      error: null,
      currentPokemon: null,
      allPokemons: [],
      currentPage: page,
    });

    try {
      const detailedPokemons: Pokemon[] = await fetchPokemonsPage(page);
      this.setState({ allPokemons: detailedPokemons, loading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      this.setState({ error: message, loading: false });
    }
  };

  render() {
    const { term, loading, error, currentPokemon, allPokemons } = this.state;

    return (
      <div className="pokemon-container">
        <SearchBar
          value={term}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
        />
        <PokemonResults
          loading={loading}
          error={error}
          currentPokemon={currentPokemon}
          allPokemons={allPokemons}
        />
        {!currentPokemon && allPokemons.length > 0 && (
          <Pagination
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        )}
        <ErrorBoundaryButton />
      </div>
    );
  }
}

export default PokemonContainer;
