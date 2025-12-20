"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import {
  Code2, Server, TrendingUp, ArrowRight, Github, Linkedin,
  Database, Cpu, Layers, Activity, Zap, ShieldCheck
} from "lucide-react";

// --- TITL CARD COMPONENT (3D INTERACTION) ---
const TiltCard = ({ children, className = "" }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transform-gpu transition-all duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- COUNTING STATS COMPONENT ---
const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
      ease: "easeOut"
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
};


// --- SECTIONS ---

const Hero = () => {
  const [particles, setParticles] = useState<Array<{ left: string, duration: number, delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--background)] perspective-1000">
      {/* Abstract Data Streams */}
      <div className="absolute inset-0 opacity-20">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-[var(--neon-blue)] w-[1px] h-32 rounded-full glowing"
            initial={{ top: -100, left: p.left, opacity: 0 }}
            animate={{ top: "110%", opacity: [0, 1, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          />
        ))}
      </div>


      <div className="relative z-10 text-center max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-block px-4 py-2 border border-[var(--neon-blue)] bg-[var(--neon-blue)]/5 text-[var(--neon-blue)] font-mono text-sm tracking-[0.2em] mb-8"
        >
          SYSTEM ONLINE // V 3.0
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 leading-none tracking-tight whitespace-nowrap">
          MSD_DEVOPS
        </h1>

        <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-3xl mx-auto mb-12">
          Universal Custom Software. Engineered to scale across any domain.
        </p>

        <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border border-[var(--neon-blue)] text-[var(--neon-blue)] font-bold hover:text-black transition-colors duration-300">
          <span className="absolute inset-0 w-full h-full bg-[var(--neon-blue)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
          <span className="relative z-10 flex items-center gap-2">Explore Solutions <ArrowRight size={18} /></span>
        </button>
      </div>
    </section >
  );
};

const DebutPartners = () => (
  <section className="py-24 bg-[var(--background)] border-y border-white/5 relative z-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h3 className="text-[var(--text-secondary)] text-sm font-mono tracking-[0.3em] uppercase mb-4">Trusted by Leading Diagnostic Centers</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">OUR DEBUT DOMAIN PARTNERS</h2>
        <div className="h-1 w-24 bg-[var(--neon-blue)] mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          "Dr. Bhonsle's Laboratory",
          "MegaScan Imaging Centre",
          "Niriksha Laboratory"
        ].map((client, i) => (
          <TiltCard key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-xl flex items-center justify-center text-center group hover:bg-white/[0.05] hover:border-[var(--neon-blue)]/30 transition-all cursor-default">
            <div className="flex flex-col items-center gap-4">
              <Activity size={32} className="text-[var(--neon-blue)] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              <span className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors tracking-wide">
                {client}
              </span>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  </section>
);

const CaseStudy3D = () => (
  <section className="py-32 px-6 md:px-12 bg-[var(--background)] overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

      {/* Left: Text */}
      <div className="order-2 lg:order-1">
        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          PROVEN IN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-green)]">HIGH-STAKES ENVIRONMENTS</span>
        </h2>
        <p className="text-xl text-[var(--text-secondary)] mb-12 leading-relaxed">
          Our debut project, <strong className="text-white">MSD-LIMS</strong>, revolutionized the healthcare workflow, proving our ability to handle complex data at scale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { val: 150, suffix: "+", label: "Daily Patients", color: "text-[var(--neon-green)]" },
            { val: 0, suffix: "", label: "Downtime", color: "text-[var(--neon-blue)]" },
            { val: 100, suffix: "%", label: "Digitized", color: "text-white" }
          ].map((stat, i) => (
            <TiltCard key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl text-center group">
              <div className={`text-4xl font-black ${stat.color} mb-2`}>
                <Counter from={0} to={stat.val} />{stat.suffix}
              </div>
              <div className="text-xs font-mono uppercase text-gray-500 tracking-wider group-hover:text-white transition-colors">{stat.label}</div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Right: 3D Laptop Mockup (Pure CSS) */}
      <div className="order-1 lg:order-2 perspective-1000 flex justify-center">
        <motion.div
          className="relative w-[600px] h-[350px] transform-style-3d"
          initial={{ rotateY: -30, rotateX: 10 }}
          animate={{ rotateY: [-30, -20, -30], rotateX: [10, 5, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Screen Construction */}
          <div className="absolute inset-0 bg-[#0f0f0f] border-8 border-[#222] rounded-t-xl overflow-hidden shadow-2xl" style={{ transform: "translateZ(20px)" }}>
            {/* Internal Screen UI */}
            <div className="w-full h-full bg-[#050505] p-4 flex flex-col gap-4 relative overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[var(--neon-blue)] to-transparent absolute top-0 left-0 animate-pulse" />

              {/* Header */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-2">
                <div className="w-20 h-4 bg-white/10 rounded animate-pulse" />
                <div className="flex-1" />
                <div className="w-8 h-8 rounded-full bg-[var(--neon-blue)]/20 border border-[var(--neon-blue)] flex items-center justify-center">
                  <Activity size={12} className="text-[var(--neon-blue)]" />
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-3 gap-4 flex-1">
                <div className="col-span-1 bg-white/5 rounded border border-white/5 p-2 flex flex-col justify-end">
                  <div className="w-full h-[40%] bg-[var(--neon-green)]/20 border-t border-[var(--neon-green)]" />
                </div>
                <div className="col-span-2 bg-white/5 rounded border border-white/5 p-2 relative overflow-hidden">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--neon-blue)]/50" />
                  <div className="absolute top-[40%] left-[20%] w-2 h-2 bg-[var(--neon-blue)] rounded-full shadow-[0_0_10px_var(--neon-blue)]" />
                </div>
                <div className="col-span-3 bg-white/5 rounded border border-white/5 p-2 flex items-center gap-2">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-[var(--neon-blue)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Base Construction */}
          <div className="absolute bottom-[-20px] left-[-50px] w-[700px] h-[20px] bg-[#1a1a1a] rounded-b-xl shadow-xl transform origin-top" style={{ transform: "rotateX(90deg) translateZ(-10px)" }}></div>
        </motion.div>
      </div>
    </div>
  </section>
);

const EngineeringCore = () => (
  <section className="py-24 px-6 md:px-12 bg-black relative">
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-bold tracking-widest text-white mb-2">THE ENGINEERING CORE</h2>
        <div className="h-1 w-20 bg-[var(--neon-blue)] mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* CARD 1: SUSHIL */}
        <TiltCard className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-8 rounded-2xl group hover:border-[var(--neon-white)]/50">
          <div className="absolute -z-10 top-0 right-0 opacity-20 group-hover:opacity-50 transition-opacity">
            <Cpu size={120} className="text-white transform rotate-12 translate-x-10 -translate-y-10" />
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white whitespace-nowrap tracking-tight">Sushil Siddhartha Bhonsle</h3>
            <div className="text-[var(--neon-white)] font-mono text-xs mt-2 uppercase tracking-widest">COO & Head of Design</div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Domain: Interface & Execution</div>
            <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-[var(--neon-white)] pl-4">
              "Bridging user needs with code. He architects the intuitive UI/UX experience and manages operations for precision delivery."
            </p>
          </div>
        </TiltCard>

        {/* CARD 2: DHRUV (CENTER HIGHLIGHT) */}
        <TiltCard className="bg-white/[0.05] backdrop-blur-xl border border-[var(--neon-blue)]/30 p-8 rounded-2xl group hover:border-[var(--neon-blue)] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10">
          <div className="absolute -z-10 top-0 right-0 opacity-20 group-hover:opacity-50 transition-opacity">
            <Layers size={120} className="text-[var(--neon-blue)] transform rotate-12 translate-x-10 -translate-y-10" />
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white whitespace-nowrap tracking-tight">Dhruv Jagannath Hadal</h3>
            <div className="text-[var(--neon-blue)] font-mono text-xs mt-2 uppercase tracking-widest">CEO & Lead Developer</div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Domain: Strategy & Business Logic</div>
            <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-[var(--neon-blue)] pl-4">
              "Aligning architecture with business goals. He engineers the core product strategy and writes the logic that drives the system."
            </p>
          </div>
        </TiltCard>

        {/* CARD 3: MANAN */}
        <TiltCard className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-8 rounded-2xl group hover:border-[var(--neon-green)]/50">
          <div className="absolute -z-10 top-0 right-0 opacity-20 group-hover:opacity-50 transition-opacity">
            <Database size={120} className="text-[var(--neon-green)] transform rotate-12 translate-x-10 -translate-y-10" />
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white whitespace-nowrap tracking-tight">Manan Mukesh Bhanushali</h3>
            <div className="text-[var(--neon-green)] font-mono text-xs mt-2 uppercase tracking-widest">CTO & Backend Lead</div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Domain: Infrastructure & Data</div>
            <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-[var(--neon-green)] pl-4">
              "Powering the engine. He architects secure, high-speed databases and manages server infrastructure for maximum scalability."
            </p>
          </div>
        </TiltCard>

      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5 bg-[#0a0a0a] text-center relative z-10">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
      We build the future. <br /><span className="text-[var(--text-secondary)]">Let's build yours.</span>
    </h2>
    <div className="inline-block px-8 py-4 border border-[var(--neon-blue)] rounded text-[var(--neon-blue)] hover:bg-[var(--neon-blue)] hover:text-black transition-all cursor-pointer mb-12 uppercase tracking-widest font-bold">
      msd.3.devops@gmail.com
    </div>
    <div className="text-xs text-gray-700 font-mono">© 2025 MSD Devops.</div>
  </footer>
);

export default function MSD_Kinetic_Page() {
  return (
    <div className="min-h-screen bg-[var(--background)] selection:bg-[var(--neon-blue)] selection:text-black">
      <Hero />
      <DebutPartners />
      <CaseStudy3D />
      <EngineeringCore />
      <Footer />
    </div>
  );
}