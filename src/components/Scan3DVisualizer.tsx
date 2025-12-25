import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mesh } from 'three';

const AnimatedSphere = () => {
  const mesh = useRef<Mesh>(null);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={mesh} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#00D9FF" // Accent color
        attach="material"
        distort={0.5}
        speed={2}
      />
    </Sphere>
  );
};

const Scan3DVisualizer: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 1]} />
      <AnimatedSphere />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Scan3DVisualizer;
