"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Environment, Center } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

// --- GLASS MONOLITH COMPONENT ---
interface MonolithProps {
    text: string;
    subtext: string;
    color: string;
    position: [number, number, number];
    delay?: number;
}

const GlassMonolith = ({ text, subtext, color, position, delay = 0 }: MonolithProps) => {
    const mesh = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            // Idle Float Animation
            const t = state.clock.elapsedTime + delay;
            mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;

            // Rotation Logic
            const targetRotationY = hovered ? 0 : Math.sin(t * 0.3) * 0.1;
            const targetRotationX = hovered ? 0 : Math.cos(t * 0.2) * 0.05;

            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotationY, delta * 2);
            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotationX, delta * 2);

            // Tilt on Hover (if we had mouse pos, but simple hover scale/straighten is good for readability)
            if (hovered) {
                mesh.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), delta * 5);
            } else {
                mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 5);
            }
        }
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transmission: 1, // Glass
        opacity: 1,
        metalness: 0,
        roughness: 0.15, // Frosted
        ior: 1.5,
        thickness: 2,
        specularIntensity: 1,
        attenuationColor: color,
        attenuationDistance: 1,
    });

    return (
        <group
            ref={mesh}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* GLASS BLOCK */}
            <mesh>
                <boxGeometry args={[3, 4, 0.5]} />
                {/* Use primitive to avoid r3f re-instantiating common material if needed, but inline is fine here */}
                <primitive object={glassMaterial} attach="material" />
            </mesh>

            {/* INNER CONTENT (Etched Appearance) */}
            <group position={[0, 0, 0]}> {/* Inside the glass */}
                <Center>
                    <Text
                        font="/inter-bold.woff" // Assuming default or fallback
                        fontSize={0.3}
                        color={color}
                        position={[0, 0.5, 0]}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {text}
                    </Text>
                    <Text
                        fontSize={0.15}
                        color="#ffffff"
                        position={[0, -0.2, 0]}
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={2.5}
                        textAlign="center"
                    >
                        {subtext}
                    </Text>
                </Center>
            </group>

            {/* BORDER ACCENT (Glowing Edge) */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3.05, 4.05, 0.45]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

// --- SCENE WRAPPER ---
export default function Partners3D() {
    return (
        <div className="w-full h-[600px] relative z-20"> {/* Increased z-index for interaction */}
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="white" />
                <pointLight position={[-10, -5, -5]} intensity={1} color="#00f3ff" />

                {/* ENVIRONMENT FOR REFRACTIONS */}
                <Environment preset="city" />

                <group position={[0, 0, 0]}>
                    {/* 1. MSD-LIMS (Dr. Bhonsle) */}
                    <GlassMonolith
                        text="Dr. S.T. Bhonsle"
                        subtext="Head of Pathology, MD"
                        color="#00f3ff"
                        position={[-3.5, 0, 0]}
                        delay={0}
                    />

                    {/* 2. LAB-2 (Generic/Coming Soon) */}
                    <GlassMonolith
                        text="Lab-2 Operations"
                        subtext="Automation Systems"
                        color="#39ff14"
                        position={[0, 0, 0]}
                        delay={2}
                    />

                    {/* 3. FUTURE PARTNER */}
                    <GlassMonolith
                        text="Global Diagnostics"
                        subtext="Network Expansion"
                        color="#bd00ff"
                        position={[3.5, 0, 0]}
                        delay={4}
                    />
                </group>

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} />
            </Canvas>
        </div>
    );
}
