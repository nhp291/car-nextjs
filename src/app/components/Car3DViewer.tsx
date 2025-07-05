'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';

// Ground component
function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 10, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[15, 10]} />
            <meshStandardMaterial color="#f3f4f6" />
        </mesh>
    );
}

// Nissan GTR Model loader
function NissanGTRModel({ file, ...props }: { file: string }) {
    const gltf = useGLTF(`/images/${file}`);
    return <primitive object={gltf.scene} scale={1.1} position={[0, 0.15, 0]} {...props} />;
}

// Ground chỉ để đổ bóng (shadow only)
function ShadowGround() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[15, 10]} />
            <shadowMaterial opacity={0.35} />
        </mesh>
    );
}

const ENV_PRESETS = [
    { label: 'Thành phố (City)', value: 'city' },
    { label: 'Hoàng hôn (Sunset)', value: 'sunset' },
    { label: 'Bình minh (Dawn)', value: 'dawn' },
    { label: 'Ban đêm (Night)', value: 'night' },
    { label: 'Nhà kho (Warehouse)', value: 'warehouse' },
    { label: 'Rừng cây (Forest)', value: 'forest' },
    { label: 'Công viên (Park)', value: 'park' },
    { label: 'Căn hộ (Apartment)', value: 'apartment' },
    { label: 'Studio', value: 'studio' },
    { label: 'Sảnh lớn (Lobby)', value: 'lobby' },
    { label: '--- Tuỳ chỉnh ---', value: '', disabled: true },
    { label: 'HDRI Trường đua (Tự thêm file .hdr)', value: 'custom-hdri', disabled: true },
    { label: 'Ảnh panorama 360° (Tự thêm file .jpg)', value: 'custom-panorama', disabled: true },
];

// Đảm bảo envPreset luôn là 1 trong các giá trị hợp lệ
const validPresets = [
    'city', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'lobby', 'park'
] as const;

type PresetType = typeof validPresets[number];

const CAR_MODELS = [
    { label: 'Nissan GTR', file: 'Nissan_GTR.glb' },
    { label: 'Mitsubishi L200', file: 'Mitsubishi_L200.glb' },
    { label: 'SUV', file: 'SUV.glb' },
    { label: 'Mẫu xe khác', file: 'CAR_Model.glb' },
];

export default function Car3DViewer() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [envPreset, setEnvPreset] = useState<PresetType>('city');
    const [carModel, setCarModel] = useState(CAR_MODELS[0].file);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Lấy tên xe hiện tại
    const currentCar = CAR_MODELS.find(c => c.file === carModel);

    return (
        <div className="w-full max-w-3xl mx-auto h-[480px] md:h-[600px] rounded-2xl overflow-visible shadow-2xl bg-gradient-to-br from-blue-200 via-indigo-50 to-indigo-200 relative flex flex-col items-center justify-start p-0 md:p-4">
            {/* Thanh chọn xe và background */}
            <div className="w-full flex flex-col md:flex-row gap-3 md:gap-6 items-center justify-center pt-4 pb-2 z-20">
                <select
                    className="rounded-lg px-3 py-2 bg-white/90 border border-gray-300 text-gray-700 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[180px]"
                    value={carModel}
                    onChange={e => setCarModel(e.target.value)}
                >
                    {CAR_MODELS.map(opt => (
                        <option key={opt.file} value={opt.file}>{opt.label}</option>
                    ))}
                </select>
                <select
                    className="rounded-lg px-3 py-2 bg-white/90 border border-gray-300 text-gray-700 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[180px]"
                    value={envPreset}
                    onChange={e => {
                        const val = e.target.value as PresetType;
                        if (validPresets.includes(val)) setEnvPreset(val);
                    }}
                >
                    {ENV_PRESETS.map(opt => (
                        <option key={opt.label} value={opt.value} disabled={!!opt.disabled}>{opt.label}</option>
                    ))}
                </select>
            </div>
            {/* Khung 3D */}
            <div className="w-full h-full flex-1 flex items-center justify-center rounded-2xl overflow-hidden bg-white/10 shadow-xl">
                <Canvas
                    camera={{ position: [0, 2.2, 7], fov: 45 }}
                    shadows
                    className="w-full h-full"
                    onCreated={() => setIsLoaded(true)}
                >
                    {/* Hiệu ứng sương mù */}
                    <fog attach="fog" args={["#e0e7ef", 5, 10]} />
                    {/* Lighting */}
                    <ambientLight intensity={0.7} />
                    <directionalLight
                        position={[5, 8, 7]}
                        intensity={1.1}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />
                    <pointLight position={[0, 4, 0]} intensity={0.4} color="#3b82f6" />
                    {/* Rim light phía sau xe */}
                    <directionalLight
                        position={[-5, 3, -5]}
                        intensity={0.7}
                        color="#a5b4fc"
                    />

                    <Suspense fallback={null}>
                        <NissanGTRModel file={carModel} />
                    </Suspense>
                    {/* Ground trong suốt chỉ để đổ bóng */}
                    <ShadowGround />
                    {/* Environment */}
                    <Environment preset={envPreset} background />
                    {/* Controls */}
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={3}
                        maxDistance={12}
                        autoRotate
                        autoRotateSpeed={0.7}
                        target={[0, 0.2, 0]}
                    />
                    {/* Animated particles */}
                    <Particles />
                </Canvas>
            </div>
            {/* Overlay info */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-3 text-sm text-white font-medium">
                <div className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    <span>{currentCar?.label || 'Xe 3D'}</span>
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

// Preload GLTF
useGLTF.preload('/images/Nissan_GTR.glb'); 