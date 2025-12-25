import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter = ({
  value,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) => {
  const [isInView, setIsInView] = useState(false);
  
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
    >
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
