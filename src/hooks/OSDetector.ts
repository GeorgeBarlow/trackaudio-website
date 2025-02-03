// hooks/useOperatingSystem.ts
"use client";
import { useEffect, useState } from "react";

export type OperatingSystem = "Windows" | "MacOS-Silicon" | "MacOS-x64" | "Linux" | "unknown";

async function getOperatingSystem(): Promise<OperatingSystem> {
  if (typeof window === "undefined") return "unknown";

  const platform = window.navigator.platform.toLowerCase();
  let architecture: string | undefined;
  // @ts-expect-error no types for "userAgentData" because this API is experimental

  if (typeof navigator.userAgentData?.getHighEntropyValues === "function") {
    try {
      // @ts-expect-error no types for "userAgentData" because this API is experimental
      const ua: { architecture: string } = await navigator.userAgentData.getHighEntropyValues(["architecture"]);
      architecture = ua.architecture;
    } catch (error) {
      console.error("Error detecting operating system architecture, probably old browser:", error);
    }
  }

  if (platform.includes("win")) return "Windows";
  if (platform.includes("mac")) return architecture == "arm" ? "MacOS-Silicon" : "MacOS-x64";
  if (platform.includes("linux")) return "Linux";

  return "unknown";
}

export function useOperatingSystem(): OperatingSystem {
  const [os, setOS] = useState<OperatingSystem>("unknown");

  useEffect(() => {
    try {
      getOperatingSystem().then(setOS);
    } catch (error) {
      console.error("Error detecting operating system:", error);
      setOS("unknown");
    }
  }, []);

  return os;
}
