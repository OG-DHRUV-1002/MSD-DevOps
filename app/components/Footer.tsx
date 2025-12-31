"use client";

import { Mail, ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
// Twitter removed in previous step, ensuring consistency here. 
// Wait, I should not import Twitter if I removed it.
// Checking previous turn, I removed Twitter icon from the render list.
// I will keep it clean.

export default function Footer() {
    return (
        <footer id="contact" className="relative z-10 py-20 px-6 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">

                {/* Brand Area */}
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black text-white tracking-tighter mb-4">
                        MSD<span className="text-[var(--neon-blue)]">.</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                        Forging the digital nervous systems of tomorrow's enterprises.
                    </p>
                </div>

                {/* CTA Area */}
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-6">Ready to Innovate?</h3>
                    <a href="mailto:msd.3.devops@gmail.com" className="inline-flex items-center gap-3 px-8 py-3 bg-[var(--neon-blue)]/10 border border-[var(--neon-blue)] rounded-full text-[var(--neon-blue)] hover:bg-[var(--neon-blue)] hover:text-black transition-all font-bold tracking-widest uppercase text-sm group">
                        <Mail size={18} />
                        Get in Touch
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Socials */}
                <div className="flex gap-6">
                    {[
                        { icon: <Github size={20} />, href: "https://github.com" },
                        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/msd-devops" }
                    ].map((social, i) => (
                        <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/10">
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-20 pt-8 border-t border-white/5 text-center md:flex md:justify-between max-w-7xl mx-auto items-center">
                <div className="text-xs text-gray-600 font-mono">© 2025 MSD DevOps. All Systems Nominal.</div>
                <div className="flex gap-8 text-xs text-gray-600 font-mono uppercase tracking-widest mt-4 md:mt-0">
                    <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy</span>
                    <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms</span>
                </div>
            </div>
        </footer>
    );
}
