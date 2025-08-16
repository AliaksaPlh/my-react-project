import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import Header from './Headet';

describe('Header component', () => {
  it('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    expect(screen.getByText(/Not Exist/i)).toBeInTheDocument();
    expect(screen.getByText(/About Me/i)).toHaveAttribute('href', '/about');
  });
});
