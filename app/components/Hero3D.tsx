"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Float } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- INTERACTIVE PARTICLES ---
const Particles = () => {
    const count = 500;
    const mesh = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();

    const dummy = useMemo(() => new THREE.Vector3(), []);

    // Generate random initial positions
    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread particles across a wide area centered on 0,0,0
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 15;
            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, []);

    // Use a Float32Array to store the original positions for "home" seeking
    const originalPositions = useMemo(() => particles.slice(), [particles]);

    useFrame((state) => {
        if (!mesh.current) return;

        // We access the raw buffer attributes
        const positions = mesh.current.geometry.attributes.position.array as Float32Array;

        // Convert normalized mouse (-1 to 1) to world coordinates (roughly)
        // For a simple effect, we just use the mouse values scaled by viewport
        // Note: z=0 because mouse is on screen plane
        const mx = (mouse.x * viewport.width) / 2;
        const my = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Current position
            let x = positions[i3];
            let y = positions[i3 + 1];
            let z = positions[i3 + 2];

            // Original position
            const ox = originalPositions[i3];
            const oy = originalPositions[i3 + 1];
            const oz = originalPositions[i3 + 2];

            // Physics: Repulsion from mouse
            const dx = x - mx;
            const dy = y - my;
            // Z distance is just distance from 0 plane for mouse
            const dist = Math.sqrt(dx * dx + dy * dy);

            const forceFieldRadius = 3;

            if (dist < forceFieldRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (forceFieldRadius - dist) * 0.1;

                x += Math.cos(angle) * force;
                y += Math.sin(angle) * force;
                // Add slight Z-push for 3D feel
                z += force * 0.5;
            }

            // Physics: Return to home (elasticity)
            // Lerp back to original position
            x += (ox - x) * 0.05;
            y += (oy - y) * 0.05;
            z += (oz - z) * 0.05;

            // Apply changes
            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;

        // Slow rotation of entire field
        mesh.current.rotation.y += 0.001;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="white"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
            />
        </points>
    );
};

// --- CENTRAL ICOSAHEDRON ---
const WireframeObject = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Icosahedron args={[1.5, 0]} ref={meshRef}>
                <meshBasicMaterial color="#00f3ff" wireframe />
            </Icosahedron>
        </Float>
    );
}

// --- MAIN HERO COMPONENT ---
export default function Hero3D() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* 3D SCENE BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <WireframeObject />
                    <Particles />
                </Canvas>
            </div>

            {/* CONTENT OVERLAY */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 backdrop-blur-[2px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
                >
                    <div className="text-[var(--neon-blue)] font-mono text-sm tracking-[0.2em] mb-4">
                        SYSTEM ONLINE // V 3.0
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter"
                        style={{
                            color: 'transparent',
                            WebkitTextStroke: '2px rgba(255,255,255,0.8)',
                        }}
                    >
                        MSD_DEVOPS
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-10"
                >
                    Universal Custom Software. Engineered to scale.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-transparent overflow-hidden border border-[var(--neon-blue)] text-[var(--neon-blue)] font-bold transition-colors"
                >
                    <span className="absolute inset-0 w-full h-full bg-[var(--neon-blue)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-black">
                        Explore Solutions <ArrowRight size={18} />
                    </span>
                </motion.button>
            </div>
        </section>
    );
}
