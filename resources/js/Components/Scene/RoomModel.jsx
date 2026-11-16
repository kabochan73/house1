import { ROOM_SIZE, ROOM_TEMPLATES, WALL_HEIGHT } from '@/constants/roomTemplates';

export default function RoomModel({ roomTemplate }) {
    const { floorColor, wallColor } =
        ROOM_TEMPLATES[roomTemplate] ?? ROOM_TEMPLATES.living;
    const half = ROOM_SIZE / 2;

    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
                <meshBasicMaterial color={floorColor} />
            </mesh>

            <mesh position={[0, WALL_HEIGHT / 2, -half]}>
                <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, 0.1]} />
                <meshBasicMaterial color={wallColor} />
            </mesh>

            <mesh
                position={[-half, WALL_HEIGHT / 2, 0]}
                rotation={[0, Math.PI / 2, 0]}
            >
                <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, 0.1]} />
                <meshBasicMaterial color={wallColor} />
            </mesh>
        </group>
    );
}
