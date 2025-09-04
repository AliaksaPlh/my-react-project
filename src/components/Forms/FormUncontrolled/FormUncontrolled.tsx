import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { schema, type FormDataFields } from '../../../validation/validation';
import { setFormData } from '../../store/slice';
import { type AppDispatch } from '../../store/store';
import { countries } from '../../../utils/consts';
import { toBase64 } from '../../../utils/helpers';
import styles from '../Form.module.css';

type FormProps = {
  onClose?: () => void;
};

export default function FormUncontrolled({ onClose }: FormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const formRefs = useRef<
    Record<string, HTMLInputElement | HTMLSelectElement | null>
  >({});

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataFields, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToValidate = {
      name: formRefs.current.name?.value || '',
      age: Number(formRefs.current.age?.value || null),
      eMail: formRefs.current.eMail?.value || '',
      password: formRefs.current.password?.value || '',
      checkPassword: formRefs.current.checkPassword?.value || '',
      gender: formRefs.current.gender?.value as 'female' | 'male',
      acceptTerms:
        formRefs.current.acceptTerms instanceof HTMLInputElement
          ? formRefs.current.acceptTerms.checked
          : false,
      photo:
        formRefs.current.photo &&
        formRefs.current.photo instanceof HTMLInputElement &&
        formRefs.current.photo.type === 'file'
          ? formRefs.current.photo.files
          : null,
      country: formRefs.current.country?.value || '',
    };
    const parsed = schema.safeParse(dataToValidate);

    if (!parsed.success) {
      const errs: Partial<Record<keyof FormDataFields, string>> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormDataFields;
        errs[field] = err.message;
      });
      setErrors(errs);
      return;
    }

    let formDataToStore: FormDataFields = parsed.data;
    if (formDataToStore.photo && formDataToStore.photo[0]) {
      const file = formDataToStore.photo[0];
      const base64 = await toBase64(file);
      formDataToStore = { ...formDataToStore, photo: base64 };
    }

    dispatch(setFormData(formDataToStore));
    setErrors({});
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formHook}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        data-testid="name"
        ref={(el) => {
          formRefs.current.name = el;
        }}
        placeholder="Enter your Name"
      />
      {errors.name && <p className={styles.error}>{errors.name}</p>}

      <label htmlFor="age">Age:</label>
      <input
        id="age"
        type="number"
        data-testid="age"
        ref={(el) => {
          formRefs.current.age = el;
        }}
        placeholder="Enter your real age (positive number)"
      />
      {errors.age && <p className={styles.error}>{errors.age}</p>}

      <label htmlFor="email">E-mail:</label>
      <input
        id="eMail"
        type="email"
        data-testid="email"
        placeholder="Enter your E-mail"
        ref={(el) => {
          formRefs.current.eMail = el;
        }}
      />
      {errors.eMail && <p className={styles.error}>{errors.eMail}</p>}

      <label htmlFor="gender">Gender Selection:</label>
      <select
        id="gender"
        data-testid="gender"
        ref={(el) => {
          formRefs.current.gender = el;
        }}
      >
        <option>Select gender</option>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        data-testid="password"
        placeholder="min 12 (uppercase, lowercase digit, special char)"
        ref={(el) => {
          formRefs.current.password = el;
        }}
      />
      {errors.password && <p className={styles.error}>{errors.password}</p>}

      <label htmlFor="checkPassword">Check Password:</label>
      <input
        id="checkPassword"
        type="password"
        data-testid="checkPsw"
        placeholder="Confirm your Password"
        ref={(el) => {
          formRefs.current.checkPassword = el;
        }}
      />
      {errors.checkPassword && (
        <p className={styles.error}>{errors.checkPassword}</p>
      )}

      <label htmlFor="photo">Upload Photo:</label>
      <input
        id="photo"
        type="file"
        data-testid="photo"
        accept=".jpeg,.png"
        ref={(el) => {
          formRefs.current.photo = el;
        }}
      />
      {errors.photo && <p className={styles.error}>{errors.photo}</p>}

      <label htmlFor="terms">Accept Terms and Conditions:</label>
      <input
        id="acceptTerms"
        type="checkbox"
        data-testid="terms"
        ref={(el) => {
          formRefs.current.acceptTerms = el;
        }}
      />
      {errors.acceptTerms && (
        <p className={styles.error}>{errors.acceptTerms}</p>
      )}

      <label htmlFor="country">Country:</label>
      <select
        id="country"
        data-testid="country"
        ref={(el) => {
          formRefs.current.country = el;
        }}
      >
        <option>Select country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {errors.country && <p className={styles.error}>{errors.country}</p>}

      <input type="submit" value="Submit" data-testid="submit" />
    </form>
  );
}
