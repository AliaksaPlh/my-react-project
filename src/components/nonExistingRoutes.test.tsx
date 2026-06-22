import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import NotFound from './nonExistingRoutes';

vi.mock('../i18n/navigation', () => {
  return {
    Link: ({
      href,
      children,
      className,
    }: {
      href: string;
      children: ReactNode;
      className?: string;
    }) => (
      <a href={href} className={className}>
        {children}
      </a>
    ),
  };
});

vi.mock('next-intl/server', () => ({
  getTranslations: () => (key: string) =>
    ({
      title: '404 - Page Not Found',
      message: 'Sorry, the page you are looking for does not exist.',
      home: 'Go Home',
    })[key] ?? key,
}));

describe('NotFound', () => {
  it('renders title, message and button', async () => {
    render(await NotFound());
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 - Page Not Found'
    );
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
