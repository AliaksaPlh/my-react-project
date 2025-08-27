import { z } from 'zod';
import { countries } from '../utils/consts';

export const schema = z
  .object({
    name: z
      .string({
        message: 'Enter your name starting with a capital letter',
      })
      .min(1, { message: 'Name is required' })
      .regex(/^[A-Z][a-zA-Z]*$/, {
        message: 'First letter must be uppercase',
      }),
    age: z.number().min(0, { message: 'Age is required' }),
    eMail: z.email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(6, { message: 'Password is required, at least 6 characters' })
      .regex(/[a-z]/, {
        message: 'Password should contain at least one lowercase',
      })
      .regex(/[A-Z]/, {
        message: 'Password should contain at least one uppercase',
      })
      .regex(/[0-9]/, { message: 'Password should contain at least one digit' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password should contain at least one special char',
      }),
    checkPassword: z
      .string()
      .min(1, { message: 'You need to confirm password correctly' }),
    gender: z.enum(['female', 'male'], {
      message: 'Select gender',
    }),
    acceptTerms: z.literal(true, {
      message: 'You must accept Terms and Conditions agreement',
    }),
    photo: z
      .any()
      .refine((file) => file?.length === 1, { message: 'Photo is required' })
      .refine((file) => file?.[0]?.size <= 2_000_000, {
        message: 'File must be less than 2MB',
      })
      .refine((file) => ['image/jpeg', 'image/png'].includes(file?.[0]?.type), {
        message: 'Only PNG or JPEG allowed',
      }),
    country: z
      .string()
      .min(1, { message: 'Select country' })
      .refine((val) => countries.some((item) => val === item.code), {
        message: 'Select a country',
      }),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: 'Passwords must match',
    path: ['checkPassword'],
  });

export type FormDataFields = z.infer<typeof schema>;
