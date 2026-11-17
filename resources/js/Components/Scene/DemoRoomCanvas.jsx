import RoomModel from '@/Components/Scene/RoomModel';
import { Clone, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const DEMO_ITEMS = [
    { modelPath: 'models/furniture/sofa-1.glb', scale: 1.5, position: [0.8, 0, -1], rotationY: 0 },
    { modelPath: 'models/furniture/table-3.glb', scale: 1.3, position: [0.8, 0, 0.6], rotationY: 0 },
    { modelPath: 'models/furniture/chair-2.glb', scale: 1.8, position: [-1.4, 0, 0.4], rotationY: Math.PI / 4 },
];

function StaticFurniture({ modelPath, scale, position, rotationY }) {
    const { scene } = useGLTF(`/${modelPath}`);

    return (
        <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
            <Clone object={scene} />
        </group>
    );
}

export default function DemoRoomCanvas() {
    return (
        <Canvas
            camera={{ position: [5.2, 4.2, 6.5], fov: 45 }}
            dpr={[1, 1.5]}
        >
            <color attach="background" args={['white']} />
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 8, 5]} intensity={0.5} />

            <RoomModel roomTemplate="living_5" />

            {DEMO_ITEMS.map((item) => (
                <StaticFurniture key={item.modelPath} {...item} />
            ))}

            <OrbitControls
                enablePan={false}
                minDistance={12}
                maxDistance={16}
                maxPolarAngle={Math.PI / 2.1}
            />
        </Canvas>
    );
}
