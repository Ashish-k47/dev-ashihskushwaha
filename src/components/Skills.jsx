import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

const loop = [...skills, ...skills];

export default function Skills() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const setTrack = () => {
        const distance = track.scrollWidth / 2;
        gsap.set(track, { x: 0 });

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${distance * 1.4}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(track, { x: -distance * self.progress });
          },
        });
        return trigger;
      };

      let trigger = setTrack();
      let lastWidth = window.innerWidth;
      const onResize = () => {
        if (window.innerWidth === lastWidth) return; // height-only change ignore
        lastWidth = window.innerWidth;
        trigger.kill();
        trigger = setTrack();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-void"
    >
      <div className="absolute inset-x-0 top-14 z-10 px-6 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
          03 — Toolkit
        </span>
        <h2 className="font-display mt-4 max-w-xl text-4xl text-ink md:text-6xl">
          Tools I reach for,{" "}
          <span className="whitespace-nowrap"> on repeat.</span>
        </h2>
      </div>

      <div className="flex h-full items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-10 pl-[10vw] pr-[10vw] will-change-transform"
        >
          {loop.map((skill, i) => {
            const isHovered = hovered === i;
            const isDimmed = hovered !== null && !isHovered;
            return (
              <div
                key={`${skill.name}-${i}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                data-cursor="interactive"
                className="relative flex h-40 w-40 shrink-0 animate-floaty items-center justify-center rounded-full transition-all duration-500 ease-out md:h-48 md:w-48"
                style={{
                  animationDelay: `${(i % skills.length) * 0.3}s`,
                  transform: isHovered ? "scale(1.28)" : "scale(1)",
                  filter: isDimmed ? "blur(3px)" : "blur(0px)",
                  opacity: isDimmed ? 0.4 : 1,
                  zIndex: isHovered ? 20 : 1,
                }}
              >
                <div
                  className="glass flex h-full w-full flex-col items-center justify-center rounded-full transition-shadow duration-500"
                  style={{
                    boxShadow: isHovered
                      ? `0 0 60px 6px ${skill.color}55, inset 0 0 30px ${skill.color}22`
                      : `0 0 0px 0px transparent`,
                    borderColor: isHovered
                      ? `${skill.color}88`
                      : "rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: skill.color,
                      boxShadow: `0 0 12px 2px ${skill.color}`,
                    }}
                  />
                  <span className="font-display mt-3 text-center text-sm text-ink md:text-base">
                    {skill.name}
                  </span>
                </div>
                {/* reflection */}
                <div className="pointer-events-none absolute inset-x-6 -bottom-2 h-6 rounded-full bg-white/5 blur-md" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
