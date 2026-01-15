import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Experience3D = ({ scrollYProgress }) => {
    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <Canvas gl={{ antialias: true, alpha: true }}>
                <Scene scrollYProgress={scrollYProgress} />
            </Canvas>
        </div>
    );
};

const Scene = ({ scrollYProgress }) => {
    const cameraRef = useRef();

    // Create a curved path for the journey
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(2, 1, -10),
            new THREE.Vector3(-2, -1, -20),
            new THREE.Vector3(0, 0, -30),
        ]);
    }, []);

    // Memoize geometry
    const tubeGeometry = useMemo(() => {
        return new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
    }, [curve]);

    useFrame(() => {
        if (!scrollYProgress) return;

        // Get current scroll value (0 to 1)
        const progress = scrollYProgress.get();
        if (progress === undefined) return;

        // Calculate position on curve
        // We limit it slightly < 1 to consistently look ahead
        const t = Math.min(progress, 0.99);
        const lookAtT = Math.min(progress + 0.05, 1);

        const pos = curve.getPoint(t);
        const lookAtPos = curve.getPoint(lookAtT);

        if (cameraRef.current) {
            cameraRef.current.position.set(pos.x, pos.y, pos.z + 2); // Keep camera slightly behind point
            cameraRef.current.lookAt(lookAtPos);
            // Add some sway based on scroll
            cameraRef.current.rotation.z = Math.sin(progress * Math.PI * 2) * 0.1;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 5]} fov={60} />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

            {/* Deep Space Background */}
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />

            {/* The Path Visualization */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh geometry={tubeGeometry}>
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#a855f7"
                        emissiveIntensity={0.2}
                        wireframe
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            </Float>

            {/* Floating Elements along the path */}
            {Array.from({ length: 30 }).map((_, i) => (
                <Float key={i} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={1}>
                    <mesh position={[
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 15,
                        -Math.random() * 40 // Distribute along depth
                    ]}>
                        <icosahedronGeometry args={[0.1 + Math.random() * 0.2]} />
                        <meshStandardMaterial
                            color={Math.random() > 0.5 ? "#9333ea" : "#60a5fa"}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </Float>
            ))}
        </>
    );
};

export default Experience3D;
