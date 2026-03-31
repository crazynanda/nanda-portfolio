"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Lanyard3D = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-secondary rounded-2xl">
      <span className="text-mono text-muted">Loading 3D...</span>
    </div>
  ),
});

interface LanyardWithFallbackProps {
  portraitUrl?: string;
}

export default function LanyardWithFallback({ 
  portraitUrl = "/images/about/portrait.jpg" 
}: LanyardWithFallbackProps) {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(typeof window !== "undefined");
  }, []);

  if (!hasWindow) {
    return (
      <div className="w-full h-full bg-secondary rounded-2xl overflow-hidden flex items-center justify-center">
        <span className="text-mono text-muted">Loading...</span>
      </div>
    );
  }

  return <Lanyard3D portraitUrl={portraitUrl} />;
}