import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('Catches and handles JavaScript errors in child components, Displays fallback UI and Logs error to console', () => {
    const ProblemChild = () => {
      throw new Error('Test error - Error caught by ErrorBoundary');
    };
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please try refreshing the page or try later/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/@ErrorBoundary/i)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});
