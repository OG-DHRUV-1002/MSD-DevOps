"use client";

import { ArtifactCanvas, CrystalArtifact, ServerArtifact, CompassArtifact } from "./Team3D";
import FloatingElement from "./FloatingElement";
import { TiltCard } from "./TiltCard";

export default function TeamSection() {
    return (
        <FloatingElement delay={0.2} className="relative z-10 w-full">
            <section className="min-h-screen py-32 px-6 md:px-12 bg-transparent relative flex flex-col justify-center">
                <div className="max-w-[1600px] mx-auto w-full">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-white mb-4">THE ENGINEERING CORE</h2>
                        <div className="h-1 w-20 bg-[var(--neon-blue)] mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* CARD 1: SUSHIL */}
                        <TiltCard className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-8 rounded-2xl group hover:border-[var(--neon-white)]/50 pt-0">
                            <div className="-mt-20">
                                <ArtifactCanvas>
                                    <CompassArtifact />
                                </ArtifactCanvas>
                            </div>

                            <div className="mb-8 text-center relative z-10">
                                <h3 className="text-2xl font-bold text-white whitespace-nowrap tracking-tight">Sushil Siddhartha Bhonsle</h3>
                                <div className="text-[var(--neon-white)] font-mono text-xs mt-2 uppercase tracking-widest">COO & Head of Design</div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Domain: Interface & Execution</div>
                                <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-[var(--neon-white)] pl-4">
                                    "Bridging user needs with code. He architects the intuitive UI/UX experience and manages operations for precision delivery."
                                </p>
                            </div>
                        </TiltCard>

                        {/* CARD 2: DHRUV (CENTER HIGHLIGHT) */}
                        <TiltCard className="bg-white/[0.05] backdrop-blur-xl border border-[var(--neon-blue)]/30 p-8 rounded-2xl group hover:border-[var(--neon-blue)] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 pt-0">
                            <div className=" -mt-20">
                                <ArtifactCanvas>
                                    <CrystalArtifact />
                                </ArtifactCanvas>
                            </div>

                            <div className="mb-8 text-center relative z-10">
                                <h3 className="text-2xl font-bold text-white whitespace-nowrap tracking-tight">Dhruv Jagannath Hadal</h3>
                                <div className="text-[var(--neon-blue)] font-mono text-xs mt-2 uppercase tracking-widest">CEO & Lead Developer</div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Domain: Strategy & Business Logic</div>
                                <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-[var(--neon-blue)] pl-4">
                                    "Aligning architecture with business goals. He engineers the core product strategy and writes the logic that drives the system."
                                </p>
                            </div>
                        </TiltCard>

                        {/* CARD 3: MANAN */}
                        <TiltCard className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-8 rounded-2xl group hover:border-[var(--neon-green)]/50 pt-0">
                            <div className="-mt-20">
                                <ArtifactCanvas>
                                    <ServerArtifact />
                                </ArtifactCanvas>
                            </div>

                            <div className="mb-8 text-center relative z-10">
                                <h3 className="text-2xl font-bold text-white whitespace-nowrap tracking-tight">Manan Mukesh Bhanushali</h3>
                                <div className="text-[var(--neon-green)] font-mono text-xs mt-2 uppercase tracking-widest">CTO & Backend Lead</div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Domain: Infrastructure & Data</div>
                                <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-[var(--neon-green)] pl-4">
                                    "Powering the engine. He architects secure, high-speed databases and manages server infrastructure for maximum scalability."
                                </p>
                            </div>
                        </TiltCard>

                    </div>
                </div>
            </section>
        </FloatingElement>
    );
}
