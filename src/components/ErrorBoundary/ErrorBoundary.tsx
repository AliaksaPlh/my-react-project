// src/components/ErrorBoundary.tsx

import React from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  // param: _: Error
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something wrong</h2>
          <p>Please try refreshing the page or trying later</p>
          <p>@ErrorBoundary</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
