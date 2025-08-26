export type Gender = 'female' | 'male';

export type User = {
  name: string;
  age: number;
  eMail: string;
  password: string;
  gender: Gender;
  photo: File | FileList | null | string;
  country: string;
};
