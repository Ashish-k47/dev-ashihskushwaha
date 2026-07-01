import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import MagneticButton from "./MagneticButton";

const words = "Ashish Kushwaha".split(" ");

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.035, delayChildren: 0.4 },
  },
};

const letter = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero({ ready }) {
  const sectionRef = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 40, damping: 20 });

  const blobOneX = useTransform(springX, [-1, 1], [-30, 30]);
  const blobOneY = useTransform(springY, [-1, 1], [-20, 20]);
  const blobTwoX = useTransform(springX, [-1, 1], [25, -25]);
  const blobTwoY = useTransform(springY, [-1, 1], [15, -15]);

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mvX.set((e.clientX / innerWidth) * 2 - 1);
      mvY.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mvX, mvY]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-void px-6 pt-32 pb-10 md:px-12"
    >
      {/* Ambient glow field */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ x: blobOneX, y: blobOneY }}
          className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-lime/20 blur-[120px] animate-blob"
        />
        <motion.div
          style={{ x: blobTwoX, y: blobTwoY }}
          className="absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-violet/20 blur-[120px] animate-blob"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0c_75%)]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-mute"
      >
        Frontend Developer
      </motion.p>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <motion.h1
          variants={container}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="font-display flex flex-wrap gap-x-[0.28em] text-[13vw] leading-[0.92] tracking-tight text-ink md:text-[7.5vw]"
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, i) => (
                <span key={i} className="overflow-hidden pb-2">
                  <motion.span variants={letter} className="inline-block">
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={
            ready
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 16, filter: "blur(6px)" }
          }
          transition={{ delay: 1.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-8 max-w-lg text-balance text-lg text-mute md:text-xl"
        >
          I build fast, accessible interfaces and full UI/UX applications —
          turning React and ReactNative into experiences that feel considered,
          not assembled.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 1.55, duration: 0.7 }}
          className="relative z-10 mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-medium text-void"
          >
            View my work
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink hover:border-lime/60 transition-colors"
          >
            Get in touch
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-10 flex items-center justify-between text-xs text-mute"
      >
        <span className="hidden font-mono md:inline">
          Based in Kanpur, India
        </span>
        <div className="mx-auto flex flex-col items-center gap-3 md:mx-0">
          <span className="font-mono uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiArrowDown />
          </motion.span>
        </div>
        <span className="hidden font-mono md:inline">01 — Intro</span>
      </motion.div>
    </section>
  );
}
