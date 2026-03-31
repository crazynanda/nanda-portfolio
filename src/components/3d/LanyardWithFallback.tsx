"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";

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
  const [webglSupported, setWebglSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-secondary rounded-2xl overflow-hidden relative">
        <Image
          src={portraitUrl}
          alt="Nanda Kumar"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  if (!webglSupported) {
    return (
      <div className="w-full h-full bg-secondary rounded-2xl overflow-hidden relative">
        <Image
          src={portraitUrl}
          alt="Nanda Kumar"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-secondary rounded-2xl">
            <span className="text-mono text-muted">Loading...</span>
          </div>
        }
      >
        <Lanyard3D portraitUrl={portraitUrl} />
      </Suspense>
    </div>
  );
}