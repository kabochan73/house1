import FurnitureInstance from '@/Components/Scene/FurnitureInstance';
import RoomModel from '@/Components/Scene/RoomModel';
import useEditorStore from '@/stores/useEditorStore';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { forwardRef, useRef } from 'react';

const RoomCanvas = forwardRef(function RoomCanvas(
    { roomTemplate, mode },
    glRef,
) {
    const orbitControlsRef = useRef();
    const items = useEditorStore((state) => state.items);
    const selectedId = useEditorStore((state) => state.selectedId);
    const selectItem = useEditorStore((state) => state.selectItem);

    return (
        <Canvas
            shadows
            camera={{ position: [4, 4, 6], fov: 50 }}
            gl={{ preserveDrawingBuffer: true }}
            onCreated={({ gl }) => {
                if (glRef) {
                    glRef.current = gl;
                }
            }}
            onPointerMissed={() => selectItem(null)}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />

            <RoomModel roomTemplate={roomTemplate} />

            {items.map((item) => (
                <FurnitureInstance
                    key={item.id}
                    item={item}
                    isSelected={item.id === selectedId}
                    mode={mode}
                    orbitControlsRef={orbitControlsRef}
                />
            ))}

            <OrbitControls ref={orbitControlsRef} makeDefault />
        </Canvas>
    );
});

export default RoomCanvas;
