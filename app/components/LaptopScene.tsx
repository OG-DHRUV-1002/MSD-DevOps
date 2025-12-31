"use client";

import { useScroll, useTexture, Grid, Center, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

// --- GEOMETRIC LAPTOP COMPONENT ---
const GeometricLaptop = (props: any) => {
    const group = useRef<THREE.Group>(null);

    const screenTexture = useTexture("/lims_dashboard.png");
    screenTexture.flipY = false;
    screenTexture.colorSpace = THREE.SRGBColorSpace;

    const scroll = useScroll();

    useFrame((state, delta) => {
        // If not in scroll controls, this might return 0. 
        // We add a fallback or just constant rotation if scroll is 0 initially?
        const r1 = scroll.range(0, 1) || 0;

        if (group.current) {
            // Optimized rotation for visibility
            // Start: -0.2 (Facing Front-ish)
            // End: 2PI - 0.2
            group.current.rotation.y = THREE.MathUtils.lerp(-0.3, Math.PI * 2 - 0.3, r1);

            // Gentle float
            group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    // Material constant for Cyber-Look
    const chassisMaterial = new THREE.MeshPhysicalMaterial({
        color: "#1a1a1a",
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
    });

    return (
        <group ref={group} {...props}>
            {/* BASE */}
            <mesh position={[0, -0.75, 0]}>
                <boxGeometry args={[2.5, 0.15, 1.8]} />
                <primitive object={chassisMaterial} attach="material" />
            </mesh>

            {/* LED STRIP ON FRONT */}
            <mesh position={[0, -0.75, 0.91]}>
                <boxGeometry args={[2.5, 0.05, 0.02]} />
                <meshBasicMaterial color="#00f3ff" />
            </mesh>

            {/* KEYBOARD AREA */}
            <mesh position={[0, -0.67, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2.2, 1]} />
                <meshStandardMaterial color="#050505" roughness={0.8} />
            </mesh>

            {/* LID GROUP */}
            <group position={[0, -0.7, -0.85]} rotation={[Math.PI / 1.8, 0, 0]}>
                {/* LID FRAME */}
                <mesh position={[0, 0.9, 0]}>
                    <boxGeometry args={[2.5, 1.8, 0.1]} />
                    <primitive object={chassisMaterial} attach="material" />
                </mesh>

                {/* SCREEN */}
                <mesh position={[0, 0.9, 0.06]}>
                    <planeGeometry args={[2.3, 1.6]} />
                    <meshBasicMaterial map={screenTexture} toneMapped={false} />
                </mesh>

                {/* GLOWING LOGO ON BACK */}
                <mesh position={[0, 0.9, -0.06]} rotation={[0, Math.PI, 0]}>
                    <circleGeometry args={[0.15, 32]} />
                    <meshBasicMaterial color="#ffffff" toneMapped={false} />
                </mesh>
            </group>
        </group>
    );
};

// --- SCENE WRAPPER ---
import { ScrollControls } from "@react-three/drei";

export default function LaptopScene() {
    return (
        <div className="w-full h-[600px]">
            <Canvas camera={{ position: [0, 2, 5], fov: 40 }} dpr={[1, 2]}>
                <ambientLight intensity={0.2} />

                {/* Dynamic Lighting Setup */}
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" distance={20} />
                <pointLight position={[-10, 5, -10]} intensity={2} color="#39ff14" distance={20} />

                {/* Rim Light for separation */}
                <spotLight position={[0, 5, -5]} intensity={10} color="#ffffff" angle={0.5} penumbra={1} />

                <ScrollControls pages={1} damping={0.4}>
                    <Center>
                        <GeometricLaptop scale={1.2} />
                    </Center>
                </ScrollControls>

                {/* CYBER GRID FLOOR */}
                <Grid
                    position={[0, -2, 0]}
                    args={[20, 20]}
                    cellSize={0.5}
                    cellThickness={0.5}
                    cellColor="#00f3ff"
                    sectionSize={2}
                    sectionThickness={1}
                    sectionColor="#39ff14"
                    fadeDistance={15}
                    fadeStrength={1}
                    infinityGrid
                />

                {/* FLOATING PARTICLES */}
                <group>
                    {[...Array(30)].map((_, i) => (
                        <mesh key={i} position={[Math.random() * 10 - 5, Math.random() * 5 - 2, Math.random() * 5 - 2]}>
                            <octahedronGeometry args={[0.05]} />
                            <meshBasicMaterial color={Math.random() > 0.5 ? "#00f3ff" : "#39ff14"} transparent opacity={0.6} />
                        </mesh>
                    ))}
                </group>

                {/* REFLECTIONS */}
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
