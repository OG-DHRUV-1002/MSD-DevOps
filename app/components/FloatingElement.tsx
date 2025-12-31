"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
    children: ReactNode;
    duration?: number;
    yOffset?: number;
    rotation?: number;
    delay?: number;
    className?: string;
}

export default function FloatingElement({
    children,
    duration = 3,
    yOffset = 15,
    rotation = 2,
    delay = 0,
    className = "",
}: FloatingElementProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-yOffset, yOffset, -yOffset],
                rotate: [-rotation, rotation, -rotation],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
}
