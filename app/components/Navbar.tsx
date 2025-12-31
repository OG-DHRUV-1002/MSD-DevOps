"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "Services", href: "/services" },
        { name: "Team", href: "/team" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${scrolled
                ? "bg-black/50 backdrop-blur-md border-b border-white/10 py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* LOGO */}
                <Link href="/" className="group relative">
                    <span className="text-2xl font-black text-white tracking-tighter">
                        MSD<span className="text-[var(--neon-blue)]">.</span>
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--neon-blue)] transition-all group-hover:w-full" />
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-mono text-gray-300 hover:text-white uppercase tracking-widest transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--neon-green)] transition-all group-hover:w-full" />
                        </Link>
                    ))}

                    {/* CTA BUTTON */}

                </nav>

                {/* MOBILE MENU TOGGLE */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* MOBILE NAV OVERLAY */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-bold text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </motion.div>
            )}
        </motion.header>
    );
}
