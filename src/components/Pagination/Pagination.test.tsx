import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders current page number', () => {
    render(<Pagination currentPage={5} onPageChange={() => {}} />);
    expect(screen.getByText('Page 5')).toBeInTheDocument();
  });
  it('disables "Previous" button on first page', () => {
    render(<Pagination currentPage={1} onPageChange={() => {}} />);
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });
  it('does not call onPageChange when Previous button is disabled and clicked', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} onPageChange={onPageChange} />);
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
    await userEvent.click(prevButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });
  it('calls onPageChange with +1 when "Next" is clicked', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={5} onPageChange={onPageChange} />);
    const nextButton = screen.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(6);
  });
  it('calls onPageChange with -1 when "Previous" is clicked', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={5} onPageChange={onPageChange} />);
    const prevButton = screen.getByRole('button', { name: /previous/i });
    await userEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
