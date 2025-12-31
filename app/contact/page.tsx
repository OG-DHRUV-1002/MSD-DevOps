"use client";

import FloatingElement from "../components/FloatingElement";
import { Mail, ArrowRight, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="pt-32 min-h-screen flex items-center justify-center">
            <FloatingElement className="max-w-4xl w-full mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        LET'S <span className="text-[var(--neon-blue)]">COLLABORATE</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Ready to forge the digital nervous system of your enterprise? We are currently accepting new partnerships for Q1 2026.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white/[0.03] border border-white/5 p-10 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[var(--neon-blue)]/30 transition-all group">
                        <Mail size={48} className="text-[var(--neon-blue)] mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
                        <p className="text-gray-400 mb-6">Direct line to our engineering core.</p>
                        <a href="mailto:msd.3.devops@gmail.com" className="inline-flex items-center gap-2 text-[var(--neon-blue)] font-bold tracking-widest uppercase hover:underline">
                            msd.3.devops@gmail.com <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="bg-white/[0.03] border border-white/5 p-10 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[var(--neon-green)]/30 transition-all group">
                        <Linkedin size={48} className="text-[var(--neon-green)] mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-bold text-white mb-2">Connect</h3>
                        <p className="text-gray-400 mb-6">Follow our latest R&D and updates.</p>
                        <a href="https://www.linkedin.com/company/msd-devops" target="_blank" className="inline-flex items-center gap-2 text-[var(--neon-green)] font-bold tracking-widest uppercase hover:underline">
                            LinkedIn Profile <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </FloatingElement>
        </div>
    );
}
