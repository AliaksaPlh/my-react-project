import { Suspense } from 'react';
import Spinner from './components/Spinner/Spinner';
import MainPage from './components/MainPage/MainPage';

export default function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <MainPage />
      </Suspense>
    </>
  );
}
