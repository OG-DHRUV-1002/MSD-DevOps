"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setComplete(true), 500);
                    return 100;
                }
                return prev + Math.random() * 5; // Random increment
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono"
                >
                    {/* LOGO PULSE */}
                    <motion.div
                        className="text-4xl font-black text-white mb-8 tracking-tighter"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        MSD<span className="text-[var(--neon-blue)]">.</span>
                    </motion.div>

                    {/* PROGRESS BAR */}
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            className="h-full bg-[var(--neon-blue)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* TEXT STATUS */}
                    <div className="mt-4 flex justify-between w-64 text-xs text-[#555]">
                        <span>INITIALIZING SYSTEM...</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
