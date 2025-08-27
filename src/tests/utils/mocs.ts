import { vi } from 'vitest';

export const mockUserData = {
  name: 'Alex',
  age: '25',
  eMail: 'alex@example.com',
  gender: 'female',
  country: 'US',
  photo: 'https://example.com/photo.jpg',
};

export const createMockStore = () => ({
  getState: () => ({
    user: mockUserData,
  }),
  subscribe: vi.fn(),
  dispatch: vi.fn(),
});
