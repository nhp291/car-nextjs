import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export default function Car3DViewer() {
    return (
        <div className="w-full h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 via-white to-indigo-100">
            <Canvas camera={{ position: [2, 2, 4], fov: 50 }} shadows>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
                {/* Thay Box bằng model GLTF/GLB khi có */}
                <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
                    <boxGeometry args={[2.2, 0.7, 1]} />
                    <meshStandardMaterial color="#3b3c98" metalness={0.5} roughness={0.3} />
                </mesh>
                <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.3, 32]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
                <mesh castShadow receiveShadow position={[1, 0.2, 0]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.3, 32]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
                <mesh castShadow receiveShadow position={[-1, 0.2, 0]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.3, 32]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
                <Environment preset="sunset" />
                <OrbitControls enablePan={false} />
            </Canvas>
        </div>
    );
} 