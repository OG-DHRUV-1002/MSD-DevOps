"use client";

import { motion } from "framer-motion";
import FloatingElement from "../components/FloatingElement";
import { ArrowRight, Globe, ShieldCheck, Activity, Zap, Server, Brain } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "MSD-LIMS",
        category: "HealthTech / DevOps",
        description: "The complete digitization of a high-volume pathology lab. Zero downtime deployment.",
        icon: <Activity size={32} className="text-[var(--neon-blue)]" />,
        color: "border-[var(--neon-blue)]",
        glow: "shadow-[0_0_30px_rgba(0,243,255,0.2)]",
        stats: ["150+ Daily Patients", "0% Error Rate", "99.9% Uptime"]
    },
    {
        title: "Custom LLMs",
        category: "Generative AI / Enterprise",
        description: "Fine-tuned large language models tailored for specialized corporate knowledge bases.",
        icon: <Brain size={32} className="text-[var(--neon-green)]" />,
        color: "border-[var(--neon-green)]",
        glow: "shadow-[0_0_30px_rgba(57,255,20,0.2)]",
        stats: ["RAG Pipelines", "Secure Hosting", "Multi-Agent"]
    },
    {
        title: "Arcpedia",
        category: "EdTech / AI",
        description: "An AI-personalised academic assistant designed to adapt to individual student learning styles.",
        icon: <Server size={32} className="text-[#bd00ff]" />,
        color: "border-[#bd00ff]",
        glow: "shadow-[0_0_30px_rgba(189,0,255,0.2)]",
        stats: ["Adaptive Learning", "Smart Summaries", "Real-time Q&A"]
    }
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
            {/* HERO HEADER */}
            <FloatingElement className="max-w-7xl mx-auto mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter mb-6"
                >
                    OUR INNOVATIONS
                </motion.h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Exploring the boundaries of what is possible with code. Here lies our archive of deployed solutions.
                </p>
            </FloatingElement>

            {/* PROJECTS GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className={`bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl group hover:${project.color} hover:${project.glow} transition-all duration-500 cursor-pointer relative overflow-hidden`}
                    >
                        <div className="absolute top-0 right-0 p-32 bg-white/5 blur-[80px] rounded-full translate-x-10 -translate-y-10 group-hover:bg-[var(--neon-blue)]/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                {project.icon}
                            </div>

                            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">{project.category}</div>
                            <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 h-20">
                                {project.description}
                            </p>

                            <div className="space-y-2 border-t border-white/5 pt-4">
                                {project.stats.map((stat, j) => (
                                    <div key={j} className="flex items-center gap-2 text-xs text-gray-300">
                                        <ShieldCheck size={12} className={project.color.replace('border-', 'text-')} />
                                        {stat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* BACK BUTTON */}
            <div className="max-w-7xl mx-auto mt-20 text-center">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                    <ArrowRight className="rotate-180" size={16} /> Back to Home
                </Link>
            </div>
        </main>
    );
}
