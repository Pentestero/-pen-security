import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "accent" | "destructive" | "warning";
  hover?: boolean;
}

const glowColors = {
  primary: "hover:shadow-[0_0_40px_rgba(0,217,255,0.3)]",
  accent: "hover:shadow-[0_0_40px_rgba(0,255,163,0.3)]",
  destructive: "hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]",
  warning: "hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]",
};

const GlowingCard = ({
  children,
  className = "",
  glowColor = "primary",
  hover = true,
}: GlowingCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hover && glowColors[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlowingCard;
