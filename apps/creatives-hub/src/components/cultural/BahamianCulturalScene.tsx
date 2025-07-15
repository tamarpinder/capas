'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sphere, 
  Cylinder, 
  Box, 
  Plane,
  Text3D,
  Float,
  useTexture,
  Sparkles,
  Environment,
  PerspectiveCamera
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
// Note: Performance optimization will be added after initial launch
// import { Adaptive3D, MobileFallback, OptimizedMotion, usePerformance } from '@/components/optimization/PerformanceOptimizer';

// Conch Shell Component
const ConchShell = ({ position = [0, 0, 0], scale = 1, animation = true }: {
  position?: [number, number, number];
  scale?: number;
  animation?: boolean;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current && animation) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Main shell body */}
      <Sphere args={[0.8, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#FFE4C4" 
          roughness={0.3}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Shell spiral */}
      <Cylinder args={[0.3, 0.1, 1.2, 8]} position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
        <meshStandardMaterial 
          color="#DEB887" 
          roughness={0.4}
        />
      </Cylinder>
      
      {/* Shell opening */}
      <Sphere args={[0.2, 8, 8]} position={[0, -0.6, 0.4]}>
        <meshStandardMaterial 
          color="#FFA07A" 
          roughness={0.2}
        />
      </Sphere>
    </group>
  );
};

// Palm Tree Component
const PalmTree = ({ position = [0, 0, 0], scale = 1 }: {
  position?: [number, number, number];
  scale?: number;
}) => {
  const trunkRef = useRef<THREE.Mesh>(null);
  const leavesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (leavesRef.current) {
      leavesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <Cylinder 
        ref={trunkRef}
        args={[0.2, 0.3, 4, 8]} 
        position={[0, 2, 0]}
      >
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.8}
        />
      </Cylinder>
      
      {/* Leaves */}
      <group ref={leavesRef} position={[0, 4, 0]}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <Plane
              key={i}
              args={[0.3, 2]}
              position={[
                Math.cos(angle) * 1.5,
                Math.random() * 0.5,
                Math.sin(angle) * 1.5
              ]}
              rotation={[
                Math.PI / 6,
                angle,
                Math.sin(angle) * 0.3
              ]}
            >
              <meshStandardMaterial 
                color="#228B22" 
                side={THREE.DoubleSide}
                transparent
                opacity={0.8}
              />
            </Plane>
          );
        })}
      </group>
    </group>
  );
};

// Junkanoo Mask Component
const JunkanooMask = ({ position = [0, 0, 0], scale = 1 }: {
  position?: [number, number, number];
  scale?: number;
}) => {
  const maskRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (maskRef.current) {
      maskRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      maskRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={maskRef} position={position} scale={scale}>
      {/* Main mask face */}
      <Sphere args={[1, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.3}
          roughness={0.2}
        />
      </Sphere>
      
      {/* Decorative feathers */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Plane
            key={i}
            args={[0.2, 1.5]}
            position={[
              Math.cos(angle) * 1.2,
              0.5,
              Math.sin(angle) * 1.2
            ]}
            rotation={[0, angle, 0]}
          >
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#FF4500" : "#4169E1"}
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
            />
          </Plane>
        );
      })}
      
      {/* Eyes */}
      <Sphere args={[0.1, 8, 8]} position={[-0.3, 0.2, 0.8]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.1, 8, 8]} position={[0.3, 0.2, 0.8]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
    </group>
  );
};

// Ocean Waves Component
const OceanWaves = () => {
  const waveRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (waveRef.current) {
      waveRef.current.position.z = Math.sin(state.clock.elapsedTime) * 0.5;
      waveRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      <Plane 
        ref={waveRef}
        args={[50, 50]} 
        position={[0, -3, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial 
          color="#4682B4" 
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </Plane>
      
      {/* Wave particles */}
      <Sparkles
        count={100}
        scale={[20, 2, 20]}
        size={2}
        speed={0.5}
        color="#87CEEB"
        position={[0, -2, 0]}
      />
    </>
  );
};

// Cultural Text Display (temporarily disabled due to missing font file)
const CulturalText = ({ text, position = [0, 0, 0], color = "#0A8A98" }: {
  text: string;
  position?: [number, number, number];
  color?: string;
}) => {
  // Temporary fallback - will be restored when font file is available
  return null;
  
  // Original implementation:
  // return (
  //   <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
  //     <Text3D
  //       font="/fonts/capas-font.json"
  //       size={1}
  //       height={0.2}
  //       curveSegments={12}
  //       bevelEnabled
  //       bevelThickness={0.02}
  //       bevelSize={0.02}
  //       bevelOffset={0}
  //       bevelSegments={5}
  //       position={position}
  //     >
  //       {text}
  //       <meshStandardMaterial 
  //         color={color}
  //         metalness={0.1}
  //         roughness={0.3}
  //       />
  //     </Text3D>
  //   </Float>
  // );
};

// Bahamian Flag Colors Sphere
const BahamianSphere = ({ position = [0, 0, 0], scale = 1 }: {
  position?: [number, number, number];
  scale?: number;
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]} position={position} scale={scale}>
      <meshStandardMaterial 
        color="#0A8A98" // Bahamian turquoise
        metalness={0.2}
        roughness={0.3}
        emissive="#FFD700"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
};

// Main Cultural Scene Component
interface BahamianCulturalSceneProps {
  variant?: 'beach' | 'carnival' | 'heritage' | 'minimal';
  showControls?: boolean;
  height?: string | number;
  className?: string;
  interactive?: boolean;
}

const BahamianCulturalScene = ({ 
  variant = 'heritage',
  showControls = true,
  height = 400,
  className = '',
  interactive = true
}: BahamianCulturalSceneProps) => {
  const [currentVariant, setCurrentVariant] = useState(variant);
  
  // Temporary performance detection (will be replaced with full optimization)
  const [isMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const [enable3D] = useState(true);
  const [isLowPerformance] = useState(false);

  const renderScene = () => {
    switch (currentVariant) {
      case 'beach':
        return (
          <>
            <OceanWaves />
            <PalmTree position={[-8, 0, -5]} scale={0.8} />
            <PalmTree position={[8, 0, -3]} scale={1.2} />
            <ConchShell position={[-3, -1, 2]} scale={0.8} />
            <ConchShell position={[4, -1, 3]} scale={1.1} />
            <BahamianSphere position={[0, 2, -8]} scale={0.5} />
            <CulturalText text="Paradise" position={[0, 4, -5]} color="#FFD700" />
          </>
        );
      
      case 'carnival':
        return (
          <>
            <OceanWaves />
            <JunkanooMask position={[-4, 1, 0]} scale={0.8} />
            <JunkanooMask position={[4, 1, 0]} scale={1.2} />
            <JunkanooMask position={[0, 3, -3]} scale={1} />
            <BahamianSphere position={[-6, 2, -2]} scale={0.6} />
            <BahamianSphere position={[6, 2, -2]} scale={0.6} />
            <CulturalText text="Junkanoo" position={[0, 5, -4]} color="#FF4500" />
            <Sparkles
              count={200}
              scale={[15, 8, 15]}
              size={3}
              speed={1}
              color="#FFD700"
            />
          </>
        );
      
      case 'heritage':
        return (
          <>
            <OceanWaves />
            <ConchShell position={[-5, 0, 0]} scale={1} />
            <PalmTree position={[5, 0, -2]} scale={1} />
            <JunkanooMask position={[0, 2, -4]} scale={0.9} />
            <BahamianSphere position={[-3, 3, -6]} scale={0.7} />
            <BahamianSphere position={[3, 3, -6]} scale={0.7} />
            <CulturalText text="CAPAS" position={[0, 5, -8]} color="#0A8A98" />
          </>
        );
      
      case 'minimal':
        return (
          <>
            <BahamianSphere position={[0, 0, 0]} scale={1.5} />
            <ConchShell position={[-3, 0, 2]} scale={0.6} animation={false} />
            <ConchShell position={[3, 0, 2]} scale={0.6} animation={false} />
          </>
        );
      
      default:
        return null;
    }
  };

  // Mobile fallback images based on variant
  const getFallbackImage = () => {
    switch (currentVariant) {
      case 'beach':
        return '/images/fallbacks/bahamian-beach.jpg';
      case 'carnival':
        return '/images/fallbacks/junkanoo-carnival.jpg';
      case 'heritage':
        return '/images/fallbacks/bahamian-heritage.jpg';
      case 'minimal':
        return '/images/fallbacks/bahamian-minimal.jpg';
      default:
        return '/images/fallbacks/bahamian-heritage.jpg';
    }
  };

  const fallbackContent = (
    <div className="w-full h-full bg-gradient-to-br from-capas-sand-light to-capas-ocean-light/20 flex items-center justify-center rounded-lg">
      <div className="text-center text-capas-ocean-dark">
        <div className="text-6xl mb-4">🏝️</div>
        <h3 className="font-semibold mb-2">Bahamian {currentVariant} Scene</h3>
        <p className="text-sm opacity-70">3D view optimized for your device</p>
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Canvas 
        camera={{ position: [0, 2, 10], fov: 60 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={1} 
          color="#FFE4B5" 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#87CEEB" />
        <spotLight 
          position={[0, 20, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.8}
          color="#0A8A98"
        />
        <Environment preset="sunset" />
        
        {renderScene()}
        
        {showControls && (
          <OrbitControls 
            enableZoom={interactive} 
            enablePan={interactive}
            enableRotate={interactive}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
            enableDamping={true}
            dampingFactor={0.05}
          />
        )}
      </Canvas>

      {/* Variant Selector */}
      {interactive && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <h4 className="font-semibold text-sm text-capas-ocean-dark mb-2">
            Cultural Themes
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'heritage', name: 'Heritage', emoji: '🏛️' },
              { id: 'beach', name: 'Beach', emoji: '🏖️' },
              { id: 'carnival', name: 'Carnival', emoji: '🎭' },
              { id: 'minimal', name: 'Minimal', emoji: '⚪' }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => setCurrentVariant(theme.id as any)}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                  currentVariant === theme.id
                    ? 'bg-capas-turquoise text-white'
                    : 'bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-turquoise/20'
                }`}
              >
                <span>{theme.emoji}</span>
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cultural Info Panel */}
      {interactive && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs"
        >
          <h4 className="font-semibold text-sm text-capas-ocean-dark mb-2">
            🇧🇸 Bahamian Culture
          </h4>
          <div className="text-xs text-capas-ocean-dark/80 space-y-2">
            {currentVariant === 'heritage' && (
              <p>Experience the rich cultural heritage of The Bahamas through traditional symbols and natural elements.</p>
            )}
            {currentVariant === 'beach' && (
              <p>The pristine beaches and tropical paradise that define Bahamian natural beauty.</p>
            )}
            {currentVariant === 'carnival' && (
              <p>Junkanoo - the vibrant street parade and cultural celebration unique to The Bahamas.</p>
            )}
            {currentVariant === 'minimal' && (
              <p>Clean and focused design highlighting the essential elements of Bahamian identity.</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {interactive && showControls && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs text-capas-ocean-dark/70 space-y-1">
            <div>🖱️ Drag to rotate</div>
            <div>🔍 Scroll to zoom</div>
            <div>🎨 Click themes to switch</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BahamianCulturalScene;