"use client";

import { Component, ReactNode } from "react";

interface ThreeErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ThreeErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ThreeErrorBoundary extends Component<
  ThreeErrorBoundaryProps,
  ThreeErrorBoundaryState
> {
  constructor(props: ThreeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ThreeErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Three.js Error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full h-full flex items-center justify-center bg-secondary rounded-2xl">
          <span className="text-mono text-muted">3D not available</span>
        </div>
      );
    }

    return this.props.children;
  }
}