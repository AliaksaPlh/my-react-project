import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'testKey';

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('check if localStorage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>(key, 'initialValue')
    );
    expect(result.current[0]).toBe('initialValue');
  });

  it(' update localStorage when value changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>(key, 'initialValue')
    );
    act(() => {
      result.current[1]('newValue');
    });
    expect(localStorage.getItem(key)).toBe(JSON.stringify('newValue'));
  });
});
