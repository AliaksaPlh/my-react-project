'use client';

import { Provider } from 'react-redux';
import store from '../../store/store';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
}
