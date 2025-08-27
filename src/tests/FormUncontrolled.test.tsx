import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../components/store/store';
import FormUncontrolled from '../components/Forms/FormUncontrolled/FormUncontrolled';

export const renderWithProvider = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Form', () => {
  it('render allform fields', () => {
    renderWithProvider(<FormUncontrolled />);
    expect(screen.getByTestId(/name/i)).toBeInTheDocument();
    expect(screen.getByTestId(/age/i)).toBeInTheDocument();
    expect(screen.getByTestId(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/gender/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/checkPsw/i)).toBeInTheDocument();
    expect(screen.getByTestId(/photo/i)).toBeInTheDocument();
    expect(screen.getByTestId(/terms/i)).toBeInTheDocument();
    expect(screen.getByTestId(/country/i)).toBeInTheDocument();
  });
  it('validation', async () => {
    renderWithProvider(<FormUncontrolled />);

    const nameInput = screen.getByTestId('name');
    const ageInput = screen.getByTestId('age');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const checkPasswordInput = screen.getByTestId('checkPsw');
    const photoInput = screen.getByTestId('photo');
    const termsInput = screen.getByTestId('terms');
    const countryInput = screen.getByTestId('country');
    fireEvent.change(photoInput, {
      target: {
        files: [new File(['photo'], 'photo.png', { type: 'image/png' })],
      },
    });
    fireEvent.change(countryInput, { target: { value: 'BY' } });
    fireEvent.change(nameInput, { target: { value: 'Alex' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(emailInput, { target: { value: 'alex@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'abcABC1!' } });
    fireEvent.change(checkPasswordInput, { target: { value: 'abcABC1!' } });
    fireEvent.change(termsInput, { target: { checked: true } });
    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/age is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password is required, at least 6 characters/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/you need to confirm password correctly/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/you must accept Terms and Conditions agreement/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/Photo is required/i)).not.toBeInTheDocument();
    });
  });

  it('validation check if password and check password are the same', async () => {
    renderWithProvider(<FormUncontrolled />);
    const passwordInput = screen.getByTestId('password');
    const checkPasswordInput = screen.getByTestId('checkPsw');
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(passwordInput, { target: { value: 'abcABC1!' } });
    fireEvent.change(checkPasswordInput, { target: { value: 'abcABC1!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage =
        screen.queryByText(/need to confirm/i) ||
        screen.queryByText(/password correctly/i);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
  it('validation check for name', async () => {
    renderWithProvider(<FormUncontrolled />);
    const nameInput = screen.getByTestId('name');
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(nameInput, { target: { value: 'Alexa' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage =
        screen.queryByText(/with a capital letter/i) ||
        screen.queryByText(/name is required/i);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
