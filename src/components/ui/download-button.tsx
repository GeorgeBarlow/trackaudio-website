// components/ui/download-button.tsx
"use client";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { OperatingSystem } from "@/hooks/OSDetector"; // Import the type

export type PlatformType = "windows" | "macos-silicon" | "macos-intel" | "linux-deb" | "linux-snap" | "linux-appimage";

export const platformGroups = {
  windows: {
    label: "Windows",
    items: [{ id: "windows", label: "Windows" }],
  },
  macos: {
    label: "macOS",
    items: [
      { id: "macos-silicon", label: "Apple Silicon (ARM)" },
      { id: "macos-intel", label: "Apple Intel (x64)" },
    ],
  },
  linux: {
    label: "Linux",
    items: [
      { id: "linux-deb", label: "Debian/Ubuntu (.deb)" },
      { id: "linux-snap", label: "Snap Store" },
      { id: "linux-appimage", label: "AppImage" },
    ],
  },
};

interface DownloadButtonProps {
  currentOS: OperatingSystem;
  onPlatformSelect: (platform: PlatformType) => void;
}

export function DownloadButton({ currentOS, onPlatformSelect }: DownloadButtonProps) {
  // Map OS to default platform
  const getDefaultPlatform = (os: OperatingSystem): PlatformType => {
    switch (os) {
      case "Windows":
        return "windows";
      case "MacOS-Silicon":
        return "macos-silicon";
      case "MacOS-x64":
        return "macos-intel";
      case "Linux":
        return "linux-deb";
      default:
        return "windows";
    }
  };

  const platform = getDefaultPlatform(currentOS);

  const getCurrentPlatformLabel = () => {
    if (currentOS === "unknown") {
      return "GitHub Release";
    }

    for (const group of Object.values(platformGroups)) {
      const item = group.items.find((item) => item.id === platform);
      if (item) return `Download for ${item.label}`;
    }
    return "Download";
  };

  const handleMainButtonClick = () => {
    if (currentOS === "unknown") {
      window.location.href = "https://github.com/pierr3/TrackAudio/releases/latest";
      return;
    }
    onPlatformSelect(platform);
  };

  // Reorder platform groups based on current OS
  const getOrderedPlatformGroups = () => {
    const groups = { ...platformGroups };
    const entries = Object.entries(groups);

    // Determine primary group based on OS
    let primaryGroup = "windows";
    if (currentOS.toLowerCase().includes("macos")) primaryGroup = "macos";
    if (currentOS === "Linux") primaryGroup = "linux";

    // Move primary group to front
    const reorderedEntries = entries.sort(([keyA], [keyB]) => {
      if (keyA === primaryGroup) return -1;
      if (keyB === primaryGroup) return 1;
      return 0;
    });

    return reorderedEntries;
  };

  const commonButtonStyles = cn(
    "rounded-lg px-6 py-4 text-base font-semibold backdrop-blur-md",
    "transition-all duration-300 border border-border",
    "bg-background/80 hover:bg-white text-foreground",
    "group-hover:-translate-y-0.5",
    "group-hover:bg-background/80",
    "hover:shadow-lg"
  );

  return (
    <div className="group flex items-center">
      <Button onClick={handleMainButtonClick} className={cn(commonButtonStyles, "rounded-r-none", "min-w-[120px] sm:min-w-[180px]", "border-r-0")}>
        <span className="opacity-90 transition-opacity">{getCurrentPlatformLabel()}</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={cn(commonButtonStyles, "rounded-l-none px-2 h-[36px]")}>
            <ChevronDown className="h-4 w-4 opacity-75" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#151515] border border-white/10 rounded-lg w-[220px] py-1">
          {getOrderedPlatformGroups().map(([key, group], index) => (
            <div key={key}>
              {index > 0 && <DropdownMenuSeparator className="bg-white/10" />}
              {group.items.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="text-white hover:text-white text-sm font-normal hover:bg-white/10 transition-colors cursor-pointer px-3 py-2"
                  onSelect={() => onPlatformSelect(item.id as PlatformType)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
