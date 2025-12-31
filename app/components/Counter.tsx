"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export const Counter = ({ from, to }: { from: number; to: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(from, to, {
            duration: 2,
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            },
            ease: "easeOut"
        });

        return () => controls.stop();
    }, [from, to]);

    return <span ref={nodeRef} />;
};
