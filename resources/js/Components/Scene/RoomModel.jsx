import { DEFAULT_ROOM_SIZE, ROOM_TEMPLATES, WALL_HEIGHT } from '@/constants/roomTemplates';

export default function RoomModel({ roomTemplate }) {
    const { floorColor, wallColor, size = DEFAULT_ROOM_SIZE } =
        ROOM_TEMPLATES[roomTemplate] ?? ROOM_TEMPLATES.living_6;
    const half = size / 2;

    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial color={floorColor} />
            </mesh>

            <mesh position={[0, WALL_HEIGHT / 2, -half]}>
                <boxGeometry args={[size, WALL_HEIGHT, 0.1]} />
                <meshBasicMaterial color={wallColor} />
            </mesh>

            <mesh
                position={[-half, WALL_HEIGHT / 2, 0]}
                rotation={[0, Math.PI / 2, 0]}
            >
                <boxGeometry args={[size, WALL_HEIGHT, 0.1]} />
                <meshBasicMaterial color={wallColor} />
            </mesh>
        </group>
    );
}
