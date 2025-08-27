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
    defaultValues: {
      name: 'Alex',
      age: 25,
      eMail: 'alex@example.com',
      gender: 'male',
      country: countries[0].code,
    },
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormDataFields> = async (data) => {
    console.log(data);
    console.log('Test form submitted successfully with valid data console log');
    if (data.photo && data.photo[0]) {
      const file = data.photo[0];
      const base64 = await toBase64(file);
      dispatch(setFormData({ ...data, photo: base64 }));
    } else {
      dispatch(setFormData(data));
    }
    if (onClose) onClose();
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formHook}>
      <label> Name:</label>
      <input type="name" {...register('name')} placeholder="Enter your Name" />
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <label>Age:</label>
      <input
        type="number"
        placeholder="Enter your real age (positive number)"
        {...register('age', { valueAsNumber: true })}
      />
      {errors.age && <p className={styles.error}>{errors.age.message}</p>}

      <label>E-mail:</label>
      <input
        type="email"
        {...register('eMail')}
        placeholder="Enter your E-mail"
      />
      {errors.eMail && <p className={styles.error}>{errors.eMail.message}</p>}

      <label>Gender Selection:</label>
      <select {...register('gender')}>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>

      <label>Password:</label>
      <input
        type="password"
        {...register('password')}
        placeholder="min 6 (uppercase, lowercase digit, special char)"
      />
      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      <label>Check Password:</label>
      <input
        type="password"
        {...register('checkPassword')}
        placeholder="Confirm your Password"
      />
      {errors.checkPassword && (
        <p className={styles.error}>{errors.checkPassword.message}</p>
      )}

      <label>Upload Photo:</label>
      <input type="file" {...register('photo')} accept=".jpeg, .png" />

      <label>Accept Terms and Conditions:</label>
      <input type="checkbox" {...register('acceptTerms')} />

      <label>Country:</label>
      <select {...register('country')}>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <input type="submit" value="Submit" disabled={!isValid} />
    </form>
  );
}
