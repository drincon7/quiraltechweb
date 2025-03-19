// Añade un componente ErrorBoundary en un archivo separado
// /components/ErrorBoundary.tsx
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 text-center">
          <h2 className="text-2xl mb-4">Algo salió mal</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => this.setState({ hasError: false })}
          >
            Intentar nuevamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;