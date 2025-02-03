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
      variant="outline"
      className={cn(
        "rounded-lg py-4 text-base font-semibold backdrop-blur-md",
        "transition-all duration-300  border border-border",
        "hover:shadow-lg hover:shadow-primary/15",
        "min-w-fit",
        variant === "primary" ? "bg-background/80 hover:bg-background text-foreground" : "bg-background/50 hover:bg-background/80 text-foreground",
        className
      )}
    >
      {children}
    </Button>
  );
};
