// src/components/ui/landing-button.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LandingButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}
export const LandingButton = ({ children, variant = "primary", className, onClick }: LandingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-lg py-4 text-base font-semibold backdrop-blur-md",
        "transition-all duration-300 hover:-translate-y-0.5 border border-white/10",
        "hover:shadow-lg hover:shadow-blue-500/10",
        "min-w-fit ", // Auto width by default, fixed in sm
        variant === "primary" ? "bg-white/5 hover:bg-white/10 text-blue-100" : "bg-white/5 hover:bg-white/10 text-blue-100",
        className
      )}
    >
      {children}
    </Button>
  );
};
