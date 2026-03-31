"use client";

import { ReactNode, Component, ErrorInfo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Lanyard3D = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-secondary rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-mono text-muted text-sm">Loading 3D...</span>
      </div>
    </div>
  ),
});

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Lanyard Error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface LanyardWithFallbackProps {
  portraitUrl?: string;
}

function FallbackUI({ portraitUrl }: { portraitUrl: string }) {
  return (
    <div className="w-full h-full bg-secondary rounded-2xl overflow-hidden relative">
      <Image
        src={portraitUrl}
        alt="Nanda Kumar"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <span className="text-mono text-white text-sm bg-black/50 px-3 py-1 rounded">
          3D View
        </span>
      </div>
    </div>
  );
}

export default function LanyardWithFallback({
  portraitUrl = "/images/about/portrait.jpg",
}: LanyardWithFallbackProps) {
  return (
    <ErrorBoundary fallback={<FallbackUI portraitUrl={portraitUrl} />}>
      <Lanyard3D portraitUrl={portraitUrl} />
    </ErrorBoundary>
  );
}