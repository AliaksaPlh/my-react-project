import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import UserProfile from '../components/UserProfile/UserProfile';
import { mockUserData } from './utils/mocs';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

const mockedUseSelector = useSelector as vi.MockedFunction<typeof useSelector>;

describe('UserProfile component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render if name is missing', () => {
    mockedUseSelector.mockReturnValue({
      ...mockUserData,
      name: '',
    });

    const { container } = render(<UserProfile />);
    expect(container.firstChild).toBeNull();
  });

  it('renders user info when data is present', () => {
    mockedUseSelector.mockReturnValue(mockUserData);

    render(<UserProfile />);
    expect(screen.getByText(/User Information/i)).toBeInTheDocument();
    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText(/25/)).toBeInTheDocument();
    expect(screen.getByText(/female/i)).toBeInTheDocument();
    expect(screen.getByText(/alex@example.com/)).toBeInTheDocument();
    expect(screen.getByAltText(/User photo/i)).toHaveAttribute(
      'src',
      'https://example.com/photo.jpg'
    );
  });
});
