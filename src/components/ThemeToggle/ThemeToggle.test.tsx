import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import ToggleThemeButton from './ThemeToggle';
import { useTheme } from '../../Context/Themecontext';
import { LIGHT } from '../../const';

vi.mock('../../Context/Themecontext', () => ({
  useTheme: vi.fn(),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ToggleThemeButton', () => {
  it('Show icon and toggle theme', () => {
    const mockToggle = vi.fn();
    (useTheme as Mock).mockReturnValue({
      theme: LIGHT,
      toggleTheme: mockToggle,
    });

    render(<ToggleThemeButton />);

    const button = screen.getByRole('button');
    const img = screen.getByAltText(/theme/i);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalled();
  });
});
