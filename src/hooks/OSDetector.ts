// hooks/useOperatingSystem.ts
"use client";
import { useEffect, useState } from "react";

export type OperatingSystem = "Windows" | "MacOS-Silicon" | "MacOS-x64" | "Linux" | "unknown";

function getOperatingSystem(): OperatingSystem {
  // Check for server-side rendering
  if (typeof window === "undefined") return "unknown";

  const platform = window.navigator.platform.toLowerCase();
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (platform.includes("win")) return "Windows";
  if (platform.includes("mac")) return userAgent.includes("arm") ? "MacOS-Silicon" : "MacOS-x64";
  if (platform.includes("linux")) return "Linux";

  return "unknown";
}

export function useOperatingSystem(): OperatingSystem {
  const [os, setOS] = useState<OperatingSystem>("unknown");

  useEffect(() => {
    try {
      setOS(getOperatingSystem());
    } catch (error) {
      console.error("Error detecting operating system:", error);
      setOS("unknown");
    }
  }, []);

  return os;
}
