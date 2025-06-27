'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Car body component - Mercedes AMG style
function CarBody({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Main body - Mercedes AMG style */}
            <mesh ref={meshRef} castShadow receiveShadow position={[0, 0.6, 0]}>
                <boxGeometry args={[2.8, 0.6, 1.4]} />
                <meshStandardMaterial
                    color="#000000"
                    metalness={0.9}
                    roughness={0.1}
                    envMapIntensity={1.2}
                />
            </mesh>

            {/* Hood - AMG signature */}
            <mesh castShadow receiveShadow position={[0, 1.0, 0.4]}>
                <boxGeometry args={[2.4, 0.08, 0.9]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Roof - sleek design */}
            <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
                <boxGeometry args={[2.0, 0.06, 1.1]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Windows - panoramic */}
            <mesh castShadow receiveShadow position={[0, 1.15, 0.5]}>
                <boxGeometry args={[1.8, 0.04, 0.7]} />
                <meshStandardMaterial color="#0ea5e9" metalness={0.95} roughness={0.05} transparent opacity={0.6} />
            </mesh>

            {/* Front window */}
            <mesh castShadow receiveShadow position={[0, 0.95, 0.7]}>
                <boxGeometry args={[1.6, 0.04, 0.4]} />
                <meshStandardMaterial color="#0ea5e9" metalness={0.95} roughness={0.05} transparent opacity={0.7} />
            </mesh>

            {/* AMG Grille */}
            <mesh castShadow receiveShadow position={[0, 0.8, 0.7]}>
                <boxGeometry args={[1.2, 0.3, 0.05]} />
                <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Mercedes Star */}
            <mesh castShadow receiveShadow position={[0, 0.95, 0.75]}>
                <cylinderGeometry args={[0.08, 0.08, 0.02, 8]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* AMG Headlights - LED style */}
            <mesh castShadow receiveShadow position={[0.9, 0.85, 0.65]}>
                <boxGeometry args={[0.3, 0.2, 0.1]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
            </mesh>
            <mesh castShadow receiveShadow position={[-0.9, 0.85, 0.65]}>
                <boxGeometry args={[0.3, 0.2, 0.1]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
            </mesh>

            {/* AMG Taillights */}
            <mesh castShadow receiveShadow position={[0.9, 0.85, -0.65]}>
                <boxGeometry args={[0.25, 0.15, 0.08]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
            </mesh>
            <mesh castShadow receiveShadow position={[-0.9, 0.85, -0.65]}>
                <boxGeometry args={[0.25, 0.15, 0.08]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
            </mesh>

            {/* AMG Exhaust tips */}
            <mesh castShadow receiveShadow position={[0.4, 0.3, -0.7]}>
                <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
                <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh castShadow receiveShadow position={[-0.4, 0.3, -0.7]}>
                <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
                <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Side skirts */}
            <mesh castShadow receiveShadow position={[1.4, 0.2, 0]}>
                <boxGeometry args={[0.05, 0.1, 1.2]} />
                <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh castShadow receiveShadow position={[-1.4, 0.2, 0]}>
                <boxGeometry args={[0.05, 0.1, 1.2]} />
                <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.4} />
            </mesh>
        </group>
    );
}

// Wheel component - AMG style
function Wheel({ position = [0, 0, 0] as [number, number, number] }) {
    const wheelRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (wheelRef.current) {
            wheelRef.current.rotation.x += 0.05;
        }
    });

    return (
        <group position={position}>
            {/* Tire - AMG performance */}
            <mesh ref={wheelRef} castShadow receiveShadow>
                <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
                <meshStandardMaterial color="#0f0f0f" />
            </mesh>

            {/* Rim - AMG forged */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.28, 0.28, 0.27, 32]} />
                <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* AMG Hub cap */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.12, 0.12, 0.29, 16]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* AMG Logo on hub */}
            <mesh castShadow receiveShadow position={[0, 0, 0.15]}>
                <cylinderGeometry args={[0.06, 0.06, 0.01, 8]} />
                <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Brake caliper */}
            <mesh castShadow receiveShadow position={[0, 0, 0.13]}>
                <boxGeometry args={[0.4, 0.08, 0.02]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
        </group>
    );
}

// Ground component
function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#f3f4f6" />
        </mesh>
    );
}

// Main Car3DViewer component
export default function Car3DViewer() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="w-full h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 via-white to-indigo-100 relative">
            {/* Loading overlay */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-blue-50/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-blue-700 font-medium">Đang tải 3D...</p>
                    </div>
                </div>
            )}

            <Canvas
                camera={{ position: [3, 2, 4], fov: 50 }}
                shadows
                className="w-full h-full"
                onCreated={() => setIsLoaded(true)}
            >
                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[5, 10, 7]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#3b82f6" />

                {/* Car components */}
                <CarBody />
                <Wheel position={[1, 0.3, 0.8]} />
                <Wheel position={[-1, 0.3, 0.8]} />
                <Wheel position={[1, 0.3, -0.8]} />
                <Wheel position={[-1, 0.3, -0.8]} />

                {/* Ground */}
                <Ground />

                {/* Environment */}
                <Environment preset="sunset" />

                {/* Controls */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={8}
                    autoRotate
                    autoRotateSpeed={0.5}
                />

                {/* Animated particles */}
                <Particles />
            </Canvas>

            {/* Overlay info */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-3 text-sm text-white font-medium">
                <div className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    <span>Mercedes-AMG C-Class</span>
                </div>
                <div className="text-xs text-gray-300 mt-1">
                    🎮 Kéo để xoay • 🔍 Cuộn để zoom
                </div>
            </div>
        </div>
    );
}

// Particles component for visual effects
function Particles() {
    const particlesRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = Math.random() * 5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#3b82f6"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
} 