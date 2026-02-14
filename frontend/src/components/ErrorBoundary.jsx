import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-2xl rounded-3xl border border-coral bg-white p-8 shadow">
          <h2 className="font-display text-2xl text-coral">Something went wrong</h2>
          <p className="mt-2 text-sm text-ink/70">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-ink px-6 py-2 text-sm font-semibold text-sand"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
