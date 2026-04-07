'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere({ color, position, speed, distort, scale }) {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * (speed * 0.1);
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.5;
  });

  return (
    <Sphere ref={meshRef} position={position} args={[scale, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={1}
        metalness={0.1}
        transparent={true}
        opacity={0.7}
      />
    </Sphere>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#FF7F50" />
      <directionalLight position={[-10, -10, 5]} intensity={0.3} color="#800000" />
      
      {/* Massive, slow-moving, soft background blends */}
      <AnimatedSphere color="#FF7F50" position={[-5, 3, -12]} speed={0.4} distort={0.5} scale={6} />
      <AnimatedSphere color="#800020" position={[5, -2, -15]} speed={0.3} distort={0.6} scale={7} />
      <AnimatedSphere color="#FFBF00" position={[0, -1, -20]} speed={0.5} distort={0.4} scale={10} />
    </Canvas>
  );
}
