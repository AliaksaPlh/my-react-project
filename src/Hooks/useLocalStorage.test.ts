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
    const { result } = renderHook(() => useLocalStorage(key));
    expect(result.current.getLocalStorage()).toBe(undefined);
  });

  it(' update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(key));
    act(() => {
      result.current.setLocalStorage('newValue');
    });
    expect(localStorage.getItem(key)).toBe(JSON.stringify('newValue'));
  });
});
