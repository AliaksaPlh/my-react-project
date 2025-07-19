import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
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

  it('calls onChange when the user types and how many times', async () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'abc');
    expect(handleChange).toHaveBeenCalledTimes(3);
  });
});
