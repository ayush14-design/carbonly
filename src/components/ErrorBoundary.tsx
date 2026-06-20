import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white px-6">
          <div className="glass p-12 rounded-[32px] text-center max-w-lg">
            <h1 className="text-3xl font-semibold mb-4 text-red-400">Something went wrong.</h1>
            <p className="text-white/70 mb-6">We encountered an unexpected error. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
