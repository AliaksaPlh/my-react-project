import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import EboutMePage from './AboutMe';

vi.mock('react-router', async (importActual) => {
  const actual = (await importActual()) as object;
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});
describe('EboutMePage', () => {
  it('renders titles, links and button', () => {
    render(
      <MemoryRouter>
        <EboutMePage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'About Me'
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Alexandra/i
    );
    expect(screen.getByRole('link', { name: /link/i })).toHaveAttribute(
      'href',
      'https://github.com/AliaksaPlh'
    );
    expect(
      screen.getByRole('link', { name: /rss react course/i })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(
      screen.getByRole('button', { name: /go home/i })
    ).toBeInTheDocument();
  });
});
