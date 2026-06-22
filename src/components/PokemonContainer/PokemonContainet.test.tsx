import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import PokemonContainer from './PokemonContainer';

const navigationMock = vi.hoisted(() => ({
  push: vi.fn(),
  searchParams: new URLSearchParams(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => navigationMock.searchParams,
}));

vi.mock('../../i18n/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: navigationMock.push }),
}));

vi.mock('../PokemonSearchBarResults/PokemonResults', () => ({
  default: ({
    term,
    currentPage,
    onItemClick,
  }: {
    term: string;
    currentPage: number;
    onItemClick: (name: string) => void;
  }) => (
    <div data-testid="pokemon-results">
      term:{term};page:{currentPage}
      <button onClick={() => onItemClick('pikachu')}>Open Pikachu</button>
    </div>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
  navigationMock.searchParams = new URLSearchParams();
  localStorage.clear();
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PokemonContainer', () => {
  it('render SearchBar (input and search button)', () => {
    render(<PokemonContainer />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('Manages search term state correctly', async () => {
    render(<PokemonContainer />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  pikachu  ' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(screen.getByTestId('pokemon-results')).toHaveTextContent(
      'term:pikachu'
    );
    expect(navigationMock.push).toHaveBeenCalledWith('/?search=pikachu');
  });

  it('check no saved term in localStorage', async () => {
    render(<PokemonContainer />);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  it('reads current page from URL search params', async () => {
    navigationMock.searchParams = new URLSearchParams({ page: '2' });
    render(<PokemonContainer />);
    expect(screen.getByTestId('pokemon-results')).toHaveTextContent('page:2');
  });

  it('updates selected pokemon in URL search params', async () => {
    render(<PokemonContainer />);
    fireEvent.click(screen.getByRole('button', { name: /open pikachu/i }));
    expect(navigationMock.push).toHaveBeenCalledWith('/?selected=pikachu');
  });
});
