"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export function ConvexProviderWithClient({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}

// Export the useConvex hook from the package directly if needed elsewhere, 
// or just rely on useQuery/useMutation from 'convex/react'
export { useConvex } from "convex/react";
