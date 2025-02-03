"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface PageTitleProps {
  title: string;
  description: string;
}

export function PageTitle({ title, description }: PageTitleProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-4 md:space-y-6">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Image src="/icon.png" alt="Track Audio Icon" width={150} height={150} className="w-auto h-[40px] md:h-[52px] lg:h-[75px] object-contain " />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-100 leading-none">
            {title}
          </h1>
        </div>
      </div>

      <p className="text-base sm:text-lg md:text-lg text-blue-100 font-semibold tracking-tighter max-w-2xl mx-auto">{description}</p>
    </motion.div>
  );
}
