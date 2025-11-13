import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  maxRetries?: number;
  retryDelay?: number;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

class LazyLoadErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    retryCount: 0,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, retryCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught:", error, errorInfo);

    const { maxRetries = 3, retryDelay = 2000 } = this.props;

    if (this.state.retryCount < maxRetries) {
      setTimeout(() => {
        this.setState((prev) => ({
          hasError: false,
          error: null,
          retryCount: prev.retryCount + 1,
        }));
      }, retryDelay);
    }
  }

  render(): ReactNode {
    const { hasError, error, retryCount } = this.state;
    const { maxRetries = 3 } = this.props;
    if (hasError) {
      if (retryCount < maxRetries) {
        return (
          <div>
            Tentative {retryCount + 1}/{maxRetries}
          </div>
        );
      }
      return <div>Echec après {maxRetries} tentatives</div>;
    }
    return this.props.children;
  }
}


export default LazyLoadErrorBoundary