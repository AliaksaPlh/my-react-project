'use client';

import { Provider } from 'react-redux';
import store from '../../store/store';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <Provider store={store}>
    //   <ErrorBoundary>{children}</ErrorBoundary>
    // </Provider>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>{children}</Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
