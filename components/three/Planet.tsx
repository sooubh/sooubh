import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  label: string;
  onClick: () => void;
  scale?: number;
}

export const Planet: React.FC<PlanetProps> = ({ position, color, label, onClick, scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.2;
        
        // Lerp scale for smooth animation without extra libraries
        const targetScale = hovered ? scale * 1.2 : scale;
        const currentScale = meshRef.current.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 5);
        meshRef.current.scale.set(newScale, newScale, newScale);
        
        // Lerp emissive intensity
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        const targetEmissive = hovered ? 0.5 : 0.2;
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetEmissive, delta * 5);
    }
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh 
            ref={meshRef}
            scale={scale}
            onClick={onClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
                color={color} 
                emissive={color}
                emissiveIntensity={0.2}
                roughness={0.7}
            />
          </mesh>
          
          {/* Label */}
          <Text
            position={[0, 1.5 * scale, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="black"
          >
            {label}
          </Text>
      </Float>
    </group>
  );
};
