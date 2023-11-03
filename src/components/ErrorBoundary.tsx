// mostly code from reactjs.org/docs/error-boundaries.html
import { Component, ErrorInfo } from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h2>There was an error with this listing.</h2>
          <p>Please reload the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
