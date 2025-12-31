"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const TiltCard = ({ children, className = "" }: any) => {
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
