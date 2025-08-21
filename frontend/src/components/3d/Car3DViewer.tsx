'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Sky } from '@react-three/drei';
import { useRef, useState, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { IcCarLogo } from '@/components/icons/IcCarLogo';

// Simple Car Model loader
function CarModel({ file, onLoad, onError }: { file: string; onLoad?: () => void; onError?: () => void }) {
    const meshRef = useRef<THREE.Group>(null);
    const [modelLoaded, setModelLoaded] = useState(false);

    const { scene } = useGLTF(`/images/${file}`, 
        undefined, 
        undefined, 
        (error) => {
            console.error('Error loading model:', error);
            onError?.();
        }
    );

    useEffect(() => {
        if (scene && !modelLoaded) {
            console.log('Model loaded successfully:', file);
            setModelLoaded(true);
            onLoad?.();
        }
    }, [scene, modelLoaded, file, onLoad]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    if (!scene) {
        return null;
    }

    return (
        <group ref={meshRef} scale={1.5} position={[0, 0, 0]}>
            <primitive object={scene} />
        </group>
    );
}

// Simple ground
function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#1e293b" />
        </mesh>
    );
}

// Simple lighting
function Lighting() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
        </>
    );
}

const AVAILABLE_CAR_MODELS = [
    { label: 'Nissan GTR', file: 'Nissan_GTR.glb' },
    { label: 'Mitsubishi L200', file: 'Mitsubishi_L200.glb' },
    { label: 'SUV', file: 'SUV.glb' },
    { label: 'Mẫu xe khác', file: 'CAR_Model.glb' },
];

export default function Car3DViewer() {
    const [carModel, setCarModel] = useState(AVAILABLE_CAR_MODELS[0].file);
    const [isLoading, setIsLoading] = useState(true);
    const [modelError, setModelError] = useState(false);
    const [showFallback, setShowFallback] = useState(false);

    const currentCar = AVAILABLE_CAR_MODELS.find(c => c.file === carModel);

    // Check if WebGL is supported
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            console.warn('WebGL not supported, showing fallback');
            setShowFallback(true);
            setIsLoading(false);
        }
    }, []);

    // Timeout to show fallback if 3D takes too long
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isLoading && !showFallback) {
                console.warn('3D loading timeout, showing fallback');
                setShowFallback(true);
                setIsLoading(false);
            }
        }, 5000); // 5 second timeout

        return () => clearTimeout(timeout);
    }, [isLoading, showFallback]);

    const handleModelChange = (newModel: string) => {
        setIsLoading(true);
        setModelError(false);
        setCarModel(newModel);
    };

    const handleModelLoad = () => {
        console.log('Model loaded successfully');
        setIsLoading(false);
        setModelError(false);
    };

    const handleModelError = () => {
        console.log('Model failed to load, showing fallback');
        setIsLoading(false);
        setModelError(true);
        setShowFallback(true);
    };

    // Simple fallback component
    if (showFallback) {
        return (
            <div className="w-full max-w-4xl mx-auto h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
                
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
                </div>

                {/* Car placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="relative mb-8">
                            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <IcCarLogo width="120px" height="120px" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">Trải nghiệm xe 3D</h3>
                        <p className="text-blue-100 mb-6 max-w-md mx-auto">
                            Khám phá xe hơi với công nghệ 3D hiện đại. Xoay, zoom và tương tác với mô hình xe thực tế.
                        </p>
                        
                        <div className="flex flex-wrap gap-3 justify-center">
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                                🎮 Kéo để xoay
                            </div>
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                                🔍 Cuộn để zoom
                            </div>
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                                ✨ 4K chất lượng
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-8 left-8 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-green-400 border border-green-500/30">
                    ⚡ Hiệu suất cao
                </div>
                
                <div className="absolute bottom-8 right-8 bg-blue-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-blue-400 border border-blue-500/30">
                    🚗 4 mẫu xe
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
            {/* Header Controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row gap-3">
                <select
                    className="rounded-xl px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[160px] transition-all duration-300 hover:bg-white/20"
                    value={carModel}
                    onChange={e => handleModelChange(e.target.value)}
                >
                    {AVAILABLE_CAR_MODELS.map((opt) => (
                        <option key={opt.file} value={opt.file} className="bg-slate-800 text-white">
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-full relative">
                <Canvas
                    camera={{ position: [0, 2, 8], fov: 45 }}
                    shadows
                    className="w-full h-full"
                    gl={{ 
                        antialias: true, 
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                >
                    {/* Sky */}
                    <Sky 
                        distance={450000} 
                        sunPosition={[0, 1, 0]} 
                        inclination={0.5} 
                        azimuth={0.25} 
                    />
                    
                    {/* Lighting */}
                    <Lighting />
                    
                    {/* Ground */}
                    <Ground />
                    
                    {/* Car model */}
                    <Suspense fallback={null}>
                        <CarModel 
                            file={carModel} 
                            onLoad={handleModelLoad}
                            onError={handleModelError}
                        />
                    </Suspense>
                    
                    {/* Environment */}
                    <Environment preset="city" background={false} />
                    
                    {/* Controls */}
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={3}
                        maxDistance={15}
                        autoRotate={false}
                        target={[0, 0, 0]}
                        dampingFactor={0.05}
                        enableDamping
                    />
                </Canvas>
            </div>

            {/* Loading overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white font-medium text-lg">Đang tải mô hình 3D</p>
                        <p className="text-blue-200 text-sm mt-2">Vui lòng chờ trong giây lát...</p>
                    </div>
                </div>
            )}

            {/* Error overlay */}
            {modelError && !showFallback && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-red-400 text-2xl">⚠️</span>
                        </div>
                        <p className="text-white font-medium text-lg">Không thể tải mô hình 3D</p>
                        <p className="text-red-200 text-sm mt-2">Vui lòng thử lại sau</p>
                        <button 
                            onClick={() => {
                                setModelError(false);
                                setIsLoading(true);
                                setShowFallback(false);
                                handleModelChange(carModel);
                            }}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            )}

            {/* Info overlay */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md rounded-2xl px-5 py-4 text-sm text-white font-medium border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-lg font-semibold">{currentCar?.label || 'Xe 3D'}</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        🎮 Kéo để xoay
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        🔍 Cuộn để zoom
                    </div>
                </div>
            </div>

            {/* Performance indicator */}
            <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-green-400 border border-green-500/30">
                ⚡ 60 FPS
            </div>

            {/* Debug info */}
            {process.env.NODE_ENV === 'development' && (
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white border border-white/20">
                    <div>Model: {currentCar?.label}</div>
                    <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
                    <div>Error: {modelError ? 'Yes' : 'No'}</div>
                    <div>Fallback: {showFallback ? 'Yes' : 'No'}</div>
                </div>
            )}
        </div>
    );
}

// Preload GLTF models
useGLTF.preload('/images/Nissan_GTR.glb');
useGLTF.preload('/images/Mitsubishi_L200.glb');
useGLTF.preload('/images/SUV.glb');
useGLTF.preload('/images/CAR_Model.glb');
