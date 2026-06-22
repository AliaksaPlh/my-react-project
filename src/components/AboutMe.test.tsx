import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import EboutMePage from './AboutMe';

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
      title: 'About Me',
      intro: 'Hello, my name is Alexandra, I am junior frontend developer.',
      github: 'Welcome to my GitHub by',
      githubLink: 'link',
      discord: 'Feel free to contact me via discord',
      course: 'I am a student of -',
      courseLink: 'RSS React Course',
      home: 'Go Home',
    })[key] ?? key,
}));

describe('EboutMePage', () => {
  it('renders titles, links and button', async () => {
    render(await EboutMePage());
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
    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
