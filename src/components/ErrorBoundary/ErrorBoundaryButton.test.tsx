import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ErrorBoundaryButton from './ErrorBoundaryButton';

describe('ErrorBoundaryButton', () => {
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('throws error when button is clicked', () => {
    render(<ErrorBoundaryButton />);
    expect(() => {
      const button = screen.getByRole('button', { name: /errorboundary/i });
      fireEvent.click(button);
    }).toThrow('💥 ErrorBoundary check');
  });
});
