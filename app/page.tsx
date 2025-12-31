"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingElement from "./components/FloatingElement";
import Hero3D from "./components/Hero3D";
import LaptopScene from "./components/LaptopScene";
import { TiltCard } from "./components/TiltCard";
import { Counter } from "./components/Counter";
import Partners3D from "./components/Partners3D";
import {
  ArrowRight, Github, Linkedin, Mail,
  Activity
} from "lucide-react";


// --- SECTIONS ---

const DebutPartners = () => (
  <FloatingElement delay={0.5} className="relative z-10">
    <section className="py-24 bg-transparent border-y border-white/5">
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
  </FloatingElement>
);

const CaseStudy3D = () => (
  <FloatingElement delay={1} className="relative z-10 w-full">
    <section className="py-32 px-6 md:px-12 bg-transparent overflow-hidden relative">
      {/* Background Gradient Spot */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--neon-blue)]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

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
              <TiltCard key={i} className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl text-center group hover:border-[var(--neon-blue)]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]">
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
            <LaptopScene />
          </motion.div>
        </div>
      </div>
    </section>
  </FloatingElement>
);



export default function MSD_Kinetic_Page() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-[var(--neon-blue)] selection:text-black">
      <Hero3D />
      <DebutPartners />
      <CaseStudy3D />
    </div>
  );
}