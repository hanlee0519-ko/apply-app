// src/components/msw-provider.tsx
"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      if (process.env.NODE_ENV === "development") {
        const { worker } = await import("@/mocks/browser");
        await worker.start({
          onUnhandledRequest: "bypass",
        });
        setMswReady(true);
      } else {
        setMswReady(true);
      }
    };

    initMSW();
  }, []);

  if (!mswReady) {
    return null; // 또는 로딩 스피너
  }

  return <>{children}</>;
}
