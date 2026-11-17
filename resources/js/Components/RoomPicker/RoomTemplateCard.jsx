import { ROOM_TEMPLATES } from '@/constants/roomTemplates';

export default function RoomTemplateCard({ roomTemplate, onSelect }) {
    const { label, wallColor, floorColor } = ROOM_TEMPLATES[roomTemplate] ?? {};

    return (
        <button
            type="button"
            onClick={() => onSelect(roomTemplate)}
            className="group overflow-hidden rounded-xl border-2 border-gray-400 bg-white text-left transition hover:border-accent-300 hover:shadow-md"
        >
            <div className="flex aspect-video flex-col">
                <div
                    className="flex-1"
                    style={{ backgroundColor: wallColor }}
                />
                <div
                    className="h-2/5"
                    style={{ backgroundColor: floorColor }}
                />
            </div>

            <div className="p-4">
                <p className="font-medium text-gray-900 group-hover:text-accent-700">
                    {label ?? roomTemplate}
                </p>
            </div>
        </button>
    );
}
