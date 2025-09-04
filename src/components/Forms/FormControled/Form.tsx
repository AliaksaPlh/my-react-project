import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from '../Form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type FormDataFields } from '../../../validation/validation';
import { countries } from '../../../utils/consts';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../store/store';
import { setFormData } from '../../store/slice';
import { toBase64 } from '../../../utils/helpers';

type FormProps = {
  onClose?: () => void;
};

export default function Form({ onClose }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      eMail: '',
      gender: undefined,
      country: undefined,
    },
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormDataFields> = async (data) => {
    if (data.photo && data.photo[0]) {
      const file = data.photo[0];
      const base64 = await toBase64(file);
      dispatch(setFormData({ ...data, photo: base64 }));
    } else {
      dispatch(setFormData(data));
    }
    onClose?.();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formHook}>
      <label> Name:</label>
      <input
        type="name"
        data-testid="name"
        {...register('name')}
        placeholder="Enter your Name"
      />
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <label>Age:</label>
      <input
        type="number"
        data-testid="age"
        placeholder="Enter your real age (positive number)"
        {...register('age', { valueAsNumber: true })}
      />
      {errors.age && <p className={styles.error}>{errors.age.message}</p>}

      <label>E-mail:</label>
      <input
        type="email"
        data-testid="email"
        {...register('eMail')}
        placeholder="Enter your E-mail"
      />
      {errors.eMail && <p className={styles.error}>{errors.eMail.message}</p>}

      <label>Gender Selection:</label>
      <select {...register('gender')} data-testid="gender">
        <option>Select gender</option>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>

      <label>Password:</label>
      <input
        type="password"
        data-testid="password"
        {...register('password')}
        placeholder="min 12 (uppercase, lowercase digit, special char)"
      />
      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      <label>Check Password:</label>
      <input
        type="password"
        data-testid="checkPsw"
        {...register('checkPassword')}
        placeholder="Confirm your Password"
      />
      {errors.checkPassword && (
        <p className={styles.error}>{errors.checkPassword.message}</p>
      )}

      <label>Upload Photo:</label>
      <input
        type="file"
        data-testid="photo"
        {...register('photo')}
        accept=".jpeg, .png"
      />

      <label>Accept Terms and Conditions:</label>
      <input type="checkbox" data-testid="terms" {...register('acceptTerms')} />

      <label>Country:</label>
      <select data-testid="country" {...register('country')}>
        <option>Select country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <input
        type="submit"
        data-testid="submit"
        value="Submit"
        disabled={!isValid}
      />
    </form>
  );
}
