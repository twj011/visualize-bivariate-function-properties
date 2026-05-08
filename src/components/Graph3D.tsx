import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';

interface Graph3DProps {
  func: (x: number, y: number) => number;
  domain?: [number, number];
  resolution?: number;
  color?: string;
  wireframe?: boolean;
}

const Surface: React.FC<Graph3DProps> = ({ func, domain = [-5, 5], resolution = 100, color = "#3b82f6", wireframe = false }) => {
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const [min, max] = domain;
    const step = (max - min) / resolution;
    
    const vertices = [];
    const indices = [];
    const colors = [];

    // Color gradient based on Z value
    const colorObj = new THREE.Color();

    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const x = min + i * step;
        const y = min + j * step;
        
        // Handle potential division by zero or NaN
        let z = func(x, y);
        if (isNaN(z) || !isFinite(z)) {
            // Approximation for singularities
            z = func(x + 0.0001, y + 0.0001);
            if (isNaN(z) || !isFinite(z)) z = 0;
        }
        
        // Clamp Z to prevent crazy spikes from ruining the view
        z = Math.max(Math.min(z, 10), -10);

        vertices.push(x, z, y); // Note: Y and Z swapped for Three.js (Y is up)

        // Generate colors (Map Z to hue)
        const normalizedZ = (z + 5) / 10; // Assuming z is mostly between -5 and 5
        colorObj.setHSL(0.6 - normalizedZ * 0.6, 1.0, 0.5); // Blue to Red
        colors.push(colorObj.r, colorObj.g, colorObj.b);
      }
    }

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const a = i * (resolution + 1) + j;
        const b = i * (resolution + 1) + j + 1;
        const c = (i + 1) * (resolution + 1) + j;
        const d = (i + 1) * (resolution + 1) + j + 1;

        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    return geom;
  }, [func, domain, resolution]);

  return (
    <mesh geometry={geometry}>
      {wireframe ? (
        <meshBasicMaterial color={color} wireframe />
      ) : (
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} />
      )}
    </mesh>
  );
};

export const Graph3D: React.FC<Graph3DProps & { title?: string }> = ({ title, ...props }) => {
  return (
    <div className="w-full h-full relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {title && (
        <div className="absolute top-4 left-4 z-10 text-white bg-black/50 px-3 py-1 rounded-md text-sm backdrop-blur-sm font-mono">
          {title}
        </div>
      )}
      <Canvas camera={{ position: [6, 4, 6], fov: 45 }}>
        <color attach="background" args={['#111827']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        
        <Surface {...props} />
        
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        <Grid infiniteGrid fadeDistance={20} sectionColor="#4b5563" cellColor="#374151" />
        <primitive object={new THREE.AxesHelper(5)} />
      </Canvas>
    </div>
  );
};
