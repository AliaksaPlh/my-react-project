import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '../components/Modal/Modal';

const onClose = vi.fn();
beforeEach(() => {
  onClose.mockClear();
});

describe('Modal', () => {
  it('does not render when isOpen=false', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByText(/Content/i)).not.toBeInTheDocument();
  });

  it('renders children when isOpen=true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText(/Content/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>x</p>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
