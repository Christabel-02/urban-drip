'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere({ color, position, speed, distort, scale }) {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * (speed * 0.5);
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.5;
  });

  return (
    <Sphere ref={meshRef} position={position} args={[scale, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FF7F50" />
      <directionalLight position={[-10, -10, 5]} intensity={0.5} color="#800020" />
      
      {/* Coral Sphere */}
      <AnimatedSphere color="#FF7F50" position={[-2, 1, -2]} speed={1} distort={0.4} scale={1.2} />
      
      {/* Burgundy Sphere */}
      <AnimatedSphere color="#800020" position={[2, -1, -3]} speed={0.8} distort={0.6} scale={1.5} />
      
      {/* Amber Sphere */}
      <AnimatedSphere color="#FFBF00" position={[0, 0, -5]} speed={1.2} distort={0.3} scale={2} />
    </Canvas>
  );
}
