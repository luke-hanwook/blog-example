import React from "react";

// https://nextjs.org/docs/pages/building-your-application/configuring/error-handling#handling-client-errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    console.log(`getDerivedStateFromError: ${error}`);

    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log(`componentDidCatch: ${JSON.stringify({ error, errorInfo })}`);
    this.setState({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent;
      }

      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
