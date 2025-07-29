import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { FinancialCube } from './FinancialCube';
import { DataNodes } from './DataNodes';

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight 
          position={[0, 20, 0]} 
          angle={0.3} 
          penumbra={0.2} 
          intensity={0.5}
          color="#3b82f6"
        />
        
        <FinancialCube />
        <DataNodes />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};