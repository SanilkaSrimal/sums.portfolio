import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useTheme } from '../contexts/ThemeContext'
import * as random from 'maath/random/dist/maath-random.esm'

function Stars(props) {
  const ref = useRef()
  const { isDarkMode } = useTheme()
  
  const [sphere] = useMemo(() => [
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  ], [])

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={isDarkMode ? '#60a5fa' : '#3b82f6'}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function FloatingCubes() {
  const meshRef = useRef()
  const { isDarkMode } = useTheme()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.1
    meshRef.current.position.y = Math.sin(time) * 0.1
  })

  return (
    <mesh ref={meshRef} position={[2, 0, -5]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        color={isDarkMode ? '#fbbf24' : '#f59e0b'} 
        transparent 
        opacity={0.6}
        wireframe
      />
    </mesh>
  )
}

function FloatingSphere() {
  const meshRef = useRef()
  const { isDarkMode } = useTheme()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.z = time * 0.2
    meshRef.current.position.x = Math.sin(time * 0.5) * 0.5
    meshRef.current.position.y = Math.cos(time * 0.3) * 0.3
  })

  return (
    <mesh ref={meshRef} position={[-2, 1, -3]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial 
        color={isDarkMode ? '#60a5fa' : '#3b82f6'} 
        transparent 
        opacity={0.7}
        wireframe
      />
    </mesh>
  )
}

const Background3D = () => {
  const { isDarkMode } = useTheme()

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: isDarkMode 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <FloatingCubes />
        <FloatingSphere />
      </Canvas>
    </div>
  )
}

export default Background3D
