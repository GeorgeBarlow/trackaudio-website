import Image from "next/image";

export function PreviewImage() {
  return (
    <div className="w-full max-w-[85%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
      <Image
        src="/app_screenshot_feb2025-transformed.png"
        alt="Track Audio app preview"
        width={0}
        height={0}
        sizes="(max-width: 768px) 85vw, (max-width: 1013px) 90vw, 95vw"
        className="mx-auto w-full h-auto"
        priority
      />
    </div>
  );
}
