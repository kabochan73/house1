import useEditorStore from '@/stores/useEditorStore';
import { Clone, TransformControls, useGLTF } from '@react-three/drei';
import { useState } from 'react';

export default function FurnitureInstance({
    item,
    isSelected,
    mode,
    orbitControlsRef,
}) {
    const { scene } = useGLTF(`/${item.modelPath}`);
    const [group, setGroup] = useState(null);
    const selectItem = useEditorStore((state) => state.selectItem);
    const updateItemTransform = useEditorStore(
        (state) => state.updateItemTransform,
    );

    const handleChange = () => {
        if (!group) {
            return;
        }

        const { x, y, z } = group.position;
        updateItemTransform(item.id, [x, y, z], group.rotation.y);
    };

    const setOrbitEnabled = (enabled) => {
        if (orbitControlsRef.current) {
            orbitControlsRef.current.enabled = enabled;
        }
    };

    return (
        <>
            <group
                ref={setGroup}
                position={item.position}
                rotation={[0, item.rotationY, 0]}
                scale={item.defaultScale}
                onClick={(event) => {
                    event.stopPropagation();
                    selectItem(item.id);
                }}
            >
                <Clone object={scene} />
            </group>

            {isSelected && group && (
                <TransformControls
                    object={group}
                    mode={mode}
                    showX={mode === 'translate'}
                    showY={mode === 'rotate'}
                    showZ={mode === 'translate'}
                    onObjectChange={handleChange}
                    onMouseDown={() => setOrbitEnabled(false)}
                    onMouseUp={() => setOrbitEnabled(true)}
                />
            )}
        </>
    );
}
