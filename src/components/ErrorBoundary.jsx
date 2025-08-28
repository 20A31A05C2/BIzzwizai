import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/30 to-bizzwiz-deep-space p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-2xl font-bold text-bizzwiz-star-white mb-4">
              Oops! Une erreur s'est produite
            </h1>
            <p className="text-bizzwiz-comet-tail mb-6">
              Nous avons rencontré un problème technique. Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-bold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Rafraîchir la page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-bizzwiz-electric-cyan cursor-pointer">
                  Détails de l'erreur (Développement)
                </summary>
                <pre className="mt-2 text-xs text-bizzwiz-comet-tail bg-bizzwiz-deep-space/50 p-2 rounded overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 