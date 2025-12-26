import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

interface IntroAnimationProps {
  onAnimationEnd: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationEnd }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setFadeOut(true), 5000);
    const endTimer = setTimeout(onAnimationEnd, 6000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(endTimer);
    };
  }, [onAnimationEnd]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const sentence = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: (i: number) => ({
      opacity: 0,
      x: (Math.random() - 0.5) * window.innerWidth,
      y: (Math.random() - 0.5) * window.innerHeight,
      rotate: (Math.random() - 0.5) * 360,
    }),
    visible: {
      opacity: [0.5, 1], // Start at 0.5 and blink to 1
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        x: { duration: 1.5, ease: "circOut" },
        y: { duration: 1.5, ease: "circOut" },
        rotate: { duration: 1.5, ease: "circOut" },
        opacity: {
          duration: 0.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
    },
  };

  const line1 = "Bienvenue en 2026";
  const line2 = "Bonne année !";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#0f0",
            },
            move: {
              direction: "bottom",
              enable: true,
              outModes: {
                default: "out",
              },
              speed: 2,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 150,
            },
            opacity: {
              value: { min: 0.3, max: 0.8 },
            },
            shape: {
              type: "char",
              options: {
                char: {
                  value: "0123456789ABCDEF",
                  font: "monospace",
                  style: "",
                  weight: "400",
                  fill: true,
                },
              },
            },
            size: {
              value: 16,
            },
          },
        }}
        className="absolute inset-0 z-0"
      />
      <div className="z-10 text-center font-mono">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-green-400"
          style={{ textShadow: '0 0 10px #00ff00' }}
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {line1.split("").map((char, index) => (
            <motion.span
              key={char + "-" + index}
              custom={index}
              variants={letter}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-4xl font-light text-green-400 mt-4"
          style={{ textShadow: '0 0 8px #00ff00' }}
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {line2.split("").map((char, index) => (
            <motion.span
              key={char + "-" + index}
              custom={index}
              variants={letter}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default IntroAnimation;