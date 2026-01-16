import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Experience3D = ({ scrollYProgress }) => {
    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            {/* Transparent Background */}
            <Canvas gl={{ antialias: true, alpha: true }}>
                <Scene scrollYProgress={scrollYProgress} />
            </Canvas>
        </div>
    );
};

const Scene = ({ scrollYProgress }) => {
    const cameraRef = useRef();
    const groupRef = useRef();

    // Animation based on scroll + continuous time
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const scroll = scrollYProgress?.get() || 0;

        if (cameraRef.current) {
            // Subtle camera sway
            cameraRef.current.position.y = Math.sin(time * 0.2) * 0.5;
            cameraRef.current.lookAt(0, 0, 0);
        }

        if (groupRef.current) {
            // Rotate the entire structure based on scroll
            groupRef.current.rotation.y = time * 0.1 + scroll * Math.PI;
            groupRef.current.rotation.x = scroll * 0.5;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 12]} fov={50} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={2} color="white" />
            <directionalLight position={[-5, -10, -5]} intensity={1} color="#444" />

            <group ref={groupRef}>
                {/* Central Complex Structure */}
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ComplexArchitecturalCore />
                </Float>

                {/* Surrounding Floating Elements */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <FloatingDebris key={i} index={i} />
                ))}
            </group>
        </>
    );
};

const ComplexArchitecturalCore = () => {
    return (
        <group>
            {/* Outer Wireframe Sphere */}
            <mesh>
                <icosahedronGeometry args={[3, 1]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
            </mesh>

            {/* Inner Rotating Rings */}
            <RotatingRing radius={2.5} speed={0.2} axis="x" />
            <RotatingRing radius={2.0} speed={0.3} axis="y" />
            <RotatingRing radius={1.5} speed={0.4} axis="z" />

            {/* Core Solid Geometries */}
            <mesh>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#222" wireframe />
            </mesh>
        </group>
    );
};

const RotatingRing = ({ radius, speed, axis }) => {
    const ref = useRef();
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation[axis] = state.clock.elapsedTime * speed;
    });

    return (
        <group ref={ref}>
            <mesh>
                <torusGeometry args={[radius, 0.02, 16, 64]} />
                <meshBasicMaterial color="#888" transparent opacity={0.4} />
            </mesh>
        </group>
    );
};

const FloatingDebris = ({ index }) => {
    const pos = useMemo(() => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 4 + Math.random() * 6; // Distance from center
        return [
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
        ];
    }, []);

    const size = Math.random() * 0.4 + 0.1;

    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
            <mesh position={pos}>
                {Math.random() > 0.5 ? (
                    <boxGeometry args={[size, size, size]} />
                ) : (
                    <tetrahedronGeometry args={[size]} />
                )}
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    );
};

export default Experience3D;
