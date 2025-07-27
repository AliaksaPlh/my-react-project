import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFound from './nonExistingRoutes';

vi.mock('react-router', async (importActual) => {
  const actual = (await importActual()) as object;
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('NotFound', () => {
  it('renders title, message and button', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 - Page Not Found'
    );
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go home/i })
    ).toBeInTheDocument();
  });
});
