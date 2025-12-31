"use client";

import { Layers, Cpu, Zap, Activity } from "lucide-react";
import FloatingElement from "./FloatingElement";
import { TiltCard } from "./TiltCard";

export default function ServicesSection() {
    return (
        <FloatingElement delay={0.2} className="relative z-10 w-full">
            <section className="min-h-screen py-32 px-6 md:px-12 bg-transparent relative flex flex-col justify-center">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="mb-16 text-center">
                        <h3 className="text-[var(--text-secondary)] text-sm font-mono tracking-[0.3em] uppercase mb-4">Core Capabilities</h3>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">ENGINEERING</span> REALITY
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We translate complex requirements into high-performance digital solutions using cutting-edge technologies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Full-Stack Web", desc: "Next.js, React, Node", icon: <Layers className="text-[var(--neon-blue)]" /> },
                            { title: "Cloud & DevOps", desc: "AWS, Docker, K8s", icon: <Cpu className="text-[var(--neon-green)]" /> },
                            { title: "AI Agentic Flows", desc: "LLMs, RAG, Automation", icon: <Zap className="text-[#bd00ff]" /> },
                            { title: "3D Experiences", desc: "Three.js, WebGL", icon: <Activity className="text-white" /> }
                        ].map((s, i) => (
                            <TiltCard key={i} className="group p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.07] h-full">
                                <div className="mb-6 w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {s.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{s.title}</h4>
                                <p className="text-sm text-gray-400 font-mono">{s.desc}</p>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>
        </FloatingElement>
    );
}
