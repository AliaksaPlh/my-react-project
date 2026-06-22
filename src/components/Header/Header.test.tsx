import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import Header from './Headet';

vi.mock('../../i18n/navigation', () => ({
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
}));

vi.mock('../LanguageSwitcher/LanguageSwitcher', () => ({
  default: () => <button>Русский</button>,
}));

vi.mock('next-intl/server', () => ({
  getTranslations: () => (key: string) =>
    ({
      about: 'About Me',
      notExist: 'Not Exist',
    })[key] ?? key,
}));

describe('Header component', () => {
  it('renders navigation links correctly', async () => {
    render(await Header());

    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    expect(screen.getByText(/Not Exist/i)).toBeInTheDocument();
    expect(screen.getByText(/About Me/i)).toHaveAttribute('href', '/about');
  });
});
