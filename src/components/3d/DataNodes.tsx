import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const DataNodes = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const nodes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 4;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    return (
      <mesh key={i} position={[x, 0, z]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#059669"
          emissiveIntensity={0.3}
        />
      </mesh>
    );
  });

  return <group ref={groupRef}>{nodes}</group>;
};