import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Input from './Input';

describe('Input', () => {
  it('renders with the correct value', () => {
    render(<Input value="hello" onChange={() => {}} />);
    const input = screen.getByDisplayValue('hello');
    expect(input).toBeInTheDocument();
  });
  it('renders with placeholder text', () => {
    render(<Input value="" onChange={() => {}} placeholder="Enter name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });
});
