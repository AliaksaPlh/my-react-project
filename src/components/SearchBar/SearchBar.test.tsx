import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('displays Input and Button', () => {
    render(<SearchBar value="" onChange={() => {}} onSearch={() => {}} />);
    expect(
      screen.getByPlaceholderText(/enter full! pokémon name/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch when Search button is clicked', async () => {
    const handleSearch = vi.fn();
    const handleChange = vi.fn();
    render(
      <SearchBar value="" onChange={handleChange} onSearch={handleSearch} />
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'name');
    expect(handleChange).toHaveBeenCalledTimes(4);
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
