import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
