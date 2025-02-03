// src/app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AirspaceDisplay } from "@/components/airspace/AirspaceDisplay";
import { PageTitle } from "@/components/ui/page-title";
import { PreviewImage } from "@/components/ui/preview-image";
import { DownloadButton, PlatformType } from "@/components/ui/download-button";
import { FAQModal } from "@/components/ui/faq-modal";
import { LandingButton } from "@/components/ui/landing-button";
import { remark } from "remark";
import html from "remark-html";
import { ThemeToggle } from "@/components/ui/theme-toggle";
interface Release {
  tag_name: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
  }>;
}

export default function Home() {
  const [platform, setPlatform] = useState<PlatformType>("windows");
  const [releases, setReleases] = useState<Release | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [faqContent, setFaqContent] = useState("");

  useEffect(() => {
    const detectPlatform = () => {
      const os = window.navigator.platform.toLowerCase();
      if (os.includes("win")) return "windows";
      if (os.includes("mac")) {
        return window.navigator.userAgent.includes("arm") ? "silicon" : "intel";
      }
      if (os.includes("linux")) return "linux-deb";
      return "windows";
    };

    setPlatform(detectPlatform() as PlatformType);

    const fetchReleases = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/pierr3/TrackAudio/releases/latest");
        const data = await response.json();
        setReleases(data);
      } catch (error) {
        console.error("Error fetching releases:", error);
      }
    };

    const fetchFAQ = async () => {
      try {
        const readme = await fetch("https://raw.githubusercontent.com/pierr3/TrackAudio/main/README.md");
        const text = await readme.text();
        const faqStart = text.indexOf("## FAQ");
        const faqEnd = text.indexOf("## Installation", faqStart);
        const faqSection = text.slice(faqStart, faqEnd);

        const processedContent = await remark().use(html).process(faqSection);

        setFaqContent(processedContent.toString());
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      }
    };

    fetchReleases();
    fetchFAQ();
  }, []);

  const handlePlatformSelect = (selectedPlatform: PlatformType) => {
    if (!releases) {
      window.location.href = "https://github.com/pierr3/TrackAudio/releases";
      return;
    }

    const patterns: Record<PlatformType, string> = {
      windows: `-x64-setup.exe`,
      "macos-silicon": `-apple-silicon.dmg`,
      "macos-intel": `-x64.dmg`,
      "linux-deb": `_amd64.deb`,
      "linux-snap": `_amd64.snap`,
      "linux-appimage": `-x86_64.AppImage`,
    };

    const asset = releases.assets.find((a) => a.name.includes(patterns[selectedPlatform]));
    window.location.href = asset?.browser_download_url || "https://github.com/pierr3/TrackAudio/releases";
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-blue-100 dark:bg-black ">
      <div className="absolute inset-0">
        <AirspaceDisplay />
      </div>
      <ThemeToggle /> {/* Add theme toggle */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto space-y-6 md:space-y-8 ">
          <PageTitle title="Track Audio" description="A next generation Audio-For-VATSIM ATC Client for macOS, Linux and Windows." />

          {/* Main container - stacked below sm, row above sm */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            {/* Download button */}
            <DownloadButton platform={platform} onPlatformSelect={handlePlatformSelect} />

            {/* Landing buttons wrapper - always in a row */}
            <div className="flex flex-row items-center gap-3 sm:gap-4">
              <LandingButton onClick={() => setShowFAQ(true)}>
                <span className="opacity-90 hover:opacity-100 transition-opacity">FAQ</span>
              </LandingButton>

              <LandingButton onClick={() => (window.location.href = "https://github.com/pierr3/TrackAudio")}>
                <span className="opacity-90 hover:opacity-100 transition-opacity">Docs</span>
              </LandingButton>

              <LandingButton onClick={() => (window.location.href = "https://github.com/pierr3/TrackAudio")}>
                <span className="opacity-90 hover:opacity-100 transition-opacity">GitHub</span>
              </LandingButton>
            </div>
          </div>
          <PreviewImage />
        </motion.div>
      </div>
      <FAQModal open={showFAQ} onOpenChange={setShowFAQ} content={faqContent} />
    </div>
  );
}
