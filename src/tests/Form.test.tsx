import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Form from '../components/Forms/FormControled/Form';
import { Provider } from 'react-redux';
import { store } from '../components/store/store';

export const renderWithProvider = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Form', () => {
  it('render allform fields', () => {
    renderWithProvider(<Form />);
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

  it('validation name: submit button is disabled when name is invalid', async () => {
    renderWithProvider(<Form />);

    const nameInput = screen.getByTestId(/name/i);
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(nameInput, { target: { value: 'alex' } });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('validation age: submit button is disabled when age is invalid', async () => {
    renderWithProvider(<Form />);

    const ageInput = screen.getByTestId(/age/i);
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(ageInput, { target: { value: '-1' } });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('validation email: submit button is disabled when email is invalid', async () => {
    renderWithProvider(<Form />);

    const emailInput = screen.getByTestId(/email/i);
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(emailInput, { target: { value: 'alexexamplecom' } });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('validation password: submit button is disabled when password is invalid', async () => {
    renderWithProvider(<Form />);

    const passwordInput = screen.getByTestId(/password/i);
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(passwordInput, { target: { value: '123' } });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('validation check password submission: submit button is disabled when password and check password are not the same', async () => {
    renderWithProvider(<Form />);

    const passwordInput = screen.getByTestId(/password/i);
    const checkPasswordInput = screen.getByTestId(/checkPsw/i);
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(passwordInput, { target: { value: 'abcABC1!' } });
    fireEvent.change(checkPasswordInput, { target: { value: 'abcABC2@' } });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('validation photo: submit button is disabled when photo is invalid', async () => {
    renderWithProvider(<Form />);

    const photoInput = screen.getByTestId(/photo/i);
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(photoInput, {
      target: {
        files: null,
      },
    });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('validation terms: submit button is disabled when terms are not accepted', async () => {
    renderWithProvider(<Form />);

    const termsInput = screen.getByTestId(/terms/i);
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(termsInput, { target: { checked: false } });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('validation submit button is enabled when validation is successful', async () => {
    renderWithProvider(<Form />);
    const nameInput = screen.getByTestId('name');
    const ageInput = screen.getByTestId('age');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const checkPasswordInput = screen.getByTestId('checkPsw');
    const termsInput = screen.getByTestId('terms');
    const photoInput = screen.getByTestId('photo');
    const countryInput = screen.getByTestId('country');

    fireEvent.change(nameInput, { target: { value: 'Alex' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(emailInput, { target: { value: 'alex@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'abcABC1!' } });
    fireEvent.change(checkPasswordInput, { target: { value: 'abcABC1!' } });
    fireEvent.change(termsInput, { target: { checked: true } });
    fireEvent.change(photoInput, {
      target: {
        files: [new File(['photo'], 'photo.png', { type: 'image/png' })],
      },
    });
    fireEvent.change(countryInput, { target: { value: 'BY' } });

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
});
