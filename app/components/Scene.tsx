"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

// --- LIGHTING & ENVIRONMENT ---
const Environment = () => {
    return (
        <>
            <ambientLight intensity={0.5} color="#00ffff" />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <fog attach="fog" args={["#000000", 5, 20]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    );
};

// --- POST-PROCESSING VARIABLES ---
const Effects = () => {
    return (
        <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={1.5} levels={9} mipmapBlur />
            <Noise opacity={0.05} />
            <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
    );
};

// --- GLOBAL SCENE COMPONENT ---
export default function Scene() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <Environment />
                <Effects />
            </Canvas>
        </div>
    );
}
