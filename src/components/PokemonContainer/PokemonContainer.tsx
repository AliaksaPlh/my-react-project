import React from "react";
import { Component } from "react";
import type { ChangeEvent } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import PokemonResults from "../PokemonSearchBarResults/PokemonResults";
import type { Pokemon, PokemonShort } from "../../types_interfaces/interfaces";
import ErrorBoundaryButton from "../ErrorBoundary/ErrorBoundaryButton";
import "./PokemonContainer.css";

type State = {
  term: string;
  loading: boolean;
  error: string | null;
  currentPokemon: Pokemon | null;
  allPokemons: PokemonShort[];
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
      term: "",
      loading: false,
      error: null,
      currentPokemon: null,
      allPokemons: [],
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem("searchTerm") || "";
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
    localStorage.setItem("searchTerm", trimmed);

    if (trimmed === "") {
      this.fetchAllPokemons();
    } else {
      this.fetchPokemon(trimmed);
    }
  };

  fetchPokemon = async (name: string) => {
    this.setState({
      loading: true,
      error: null,
      currentPokemon: null,
      allPokemons: [],
    });

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) throw new Error(`Pokémon "${name}" not found.`);

      const data: Pokemon = await response.json();
      this.setState({ currentPokemon: data, loading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      this.setState({ error: message, loading: false });
    }
  };

  fetchAllPokemons = async () => {
    this.setState({
      loading: true,
      error: null,
      currentPokemon: null,
      allPokemons: [],
    });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`,
      );
      if (!response.ok)
        throw new Error(`Failed to fetch list. Status: ${response.status}`);

      const data: { results: PokemonShort[] } = await response.json();
      this.setState({ allPokemons: data.results, loading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
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
        <ErrorBoundaryButton />
      </div>
    );
  }
}

export default PokemonContainer;
