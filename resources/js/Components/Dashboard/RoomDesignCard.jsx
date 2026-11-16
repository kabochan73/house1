import { Link } from '@inertiajs/react';

export default function RoomDesignCard({ roomDesign }) {
    return (
        <Link
            href={route('room-designs.edit', roomDesign.id)}
            className="group overflow-hidden rounded-xl border-2 border-gray-400 bg-white transition hover:border-accent-300 hover:shadow-md"
        >
            <div className="flex aspect-video items-center justify-center bg-gray-50">
                {roomDesign.thumbnail ? (
                    <img
                        src={`/storage/${roomDesign.thumbnail}`}
                        alt={roomDesign.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="text-sm text-gray-400">
                        No preview yet
                    </span>
                )}
            </div>

            <div className="p-4">
                <p className="font-medium text-gray-900 group-hover:text-accent-700">
                    {roomDesign.name}
                </p>
            </div>
        </Link>
    );
}
