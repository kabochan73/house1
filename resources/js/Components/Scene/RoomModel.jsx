import { DEFAULT_ROOM_SIZE, ROOM_TEMPLATES, WALL_HEIGHT } from '@/constants/roomTemplates';

export default function RoomModel({ roomTemplate }) {
    const {
        floorColor,
        wallColor,
        width = DEFAULT_ROOM_SIZE,
        depth = DEFAULT_ROOM_SIZE,
    } = ROOM_TEMPLATES[roomTemplate] ?? ROOM_TEMPLATES.room_6x6;
    const halfWidth = width / 2;
    const halfDepth = depth / 2;

    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[width, depth]} />
                <meshBasicMaterial color={floorColor} />
            </mesh>

            <mesh position={[0, WALL_HEIGHT / 2, -halfDepth]}>
                <boxGeometry args={[width, WALL_HEIGHT, 0.1]} />
                <meshBasicMaterial color={wallColor} />
            </mesh>

            <mesh
                position={[-halfWidth, WALL_HEIGHT / 2, 0]}
                rotation={[0, Math.PI / 2, 0]}
            >
                <boxGeometry args={[depth, WALL_HEIGHT, 0.1]} />
                <meshBasicMaterial color={wallColor} />
            </mesh>
        </group>
    );
}
