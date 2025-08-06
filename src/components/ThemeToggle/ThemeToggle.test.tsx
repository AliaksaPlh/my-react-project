import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import ToggleThemeButton from './ThemeToggle';
import { useTheme, useUpdateTheme } from '../../Context/Themecontext';

vi.mock('../../Context/Themecontext', () => ({
  useTheme: vi.fn(),
  useUpdateTheme: vi.fn(),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ToggleThemeButton', () => {
  it('Show icon and toggle theme', () => {
    (useTheme as Mock).mockReturnValue('light');
    const mockToggle = vi.fn();
    (useUpdateTheme as Mock).mockReturnValue(mockToggle);

    render(<ToggleThemeButton />);

    const button = screen.getByRole('button');
    const img = screen.getByAltText(/theme/i);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalledWith('dark');
  });
});
