"use client";

import { ReactNode, Component, ErrorInfo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Lanyard3D = dynamic(() => import("./Lanyard"), {
  ssr: false,
});

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Lanyard error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function LanyardWithFallback({ portraitUrl = "/images/about/portrait.jpg" }: { portraitUrl?: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full bg-secondary rounded-2xl overflow-hidden relative">
          <Image src={portraitUrl} alt="Nanda Kumar" fill className="object-cover" />
        </div>
      }
    >
      <Lanyard3D portraitUrl={portraitUrl} />
    </ErrorBoundary>
  );
}