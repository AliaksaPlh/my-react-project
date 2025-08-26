import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../utils/types';

const initialState: User = {
  name: '',
  age: 0,
  eMail: '',
  password: '',
  gender: 'female',
  photo: '',
  country: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    setPhoto: (
      state,
      action: PayloadAction<FileList | File | null | string>
    ) => {
      state.photo = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    cleanFormData: () => initialState,
  },
});

export const { setFormData, cleanFormData, setPhoto, setCountry } =
  formSlice.actions;
export default formSlice.reducer;
