"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, Octahedron, Torus, Cone } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

// --- COMMON INTERACTION ---
// Smoothly interpolate color and rotation speed on hover
const InteractiveObject = ({ children, color, hoverColor }: any) => {
    const mesh = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            // Rotation Speed
            const speed = hovered ? 2.0 : 0.5;
            mesh.current.rotation.y += delta * speed;
            mesh.current.rotation.x += delta * (speed * 0.5);
        }
    });

    return (
        <group
            ref={mesh}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? 1.2 : 1}
        >
            {children(hovered)}
        </group>
    );
};


// --- ARTIFACTS ---

// 1. Crystal (Brain) - Dhruv
export const CrystalArtifact = () => {
    return (
        <InteractiveObject>
            {(hovered: boolean) => (
                <Octahedron args={[1.5, 0]}>
                    <meshStandardMaterial
                        color={hovered ? "#00f3ff" : "#ffffff"}
                        wireframe
                        emissive={hovered ? "#00f3ff" : "#000000"}
                        emissiveIntensity={2}
                    />
                </Octahedron>
            )}
        </InteractiveObject>
    );
};

// 2. Server Block - Manan
export const ServerArtifact = () => {
    return (
        <InteractiveObject>
            {(hovered: boolean) => (
                <group>
                    {/* Main Chassis */}
                    <Box args={[2, 3, 1]}>
                        <meshStandardMaterial
                            color={hovered ? "#39ff14" : "#222222"}
                            wireframe={hovered}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </Box>
                    {/* Blink Lights */}
                    <Box args={[1.8, 0.1, 1.1]} position={[0, 1, 0]}>
                        <meshBasicMaterial color="#39ff14" />
                    </Box>
                    <Box args={[1.8, 0.1, 1.1]} position={[0, 0, 0]}>
                        <meshBasicMaterial color="#39ff14" />
                    </Box>
                    <Box args={[1.8, 0.1, 1.1]} position={[0, -1, 0]}>
                        <meshBasicMaterial color="#39ff14" />
                    </Box>
                </group>
            )}
        </InteractiveObject>
    );
};

// 3. Compass/Gear - Sushil
export const CompassArtifact = () => {
    return (
        <InteractiveObject>
            {(hovered: boolean) => (
                <group rotation={[Math.PI / 2, 0, 0]}>
                    {/* Outer Ring */}
                    <Torus args={[1.5, 0.1, 16, 32]}>
                        <meshStandardMaterial color={hovered ? "#ffffff" : "#555555"} />
                    </Torus>
                    {/* Inner Pointer */}
                    <Cone args={[0.5, 2, 4]} rotation={[0, 0, -Math.PI / 4]}>
                        <meshStandardMaterial
                            color={hovered ? "#ffffff" : "#aaaaaa"}
                            wireframe
                            emissive={hovered ? "#ffffff" : "#000000"}
                        />
                    </Cone>
                </group>
            )}
        </InteractiveObject>
    );
};

// --- WRAPPER ---
export const ArtifactCanvas = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-[300px]">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    {children}
                </Float>
            </Canvas>
        </div>
    );
}

