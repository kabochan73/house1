import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function RoomDesignCard({ roomDesign }) {
    const [copied, setCopied] = useState(false);

    const copyShareLink = async (event) => {
        event.preventDefault();

        const url = `${window.location.origin}/share/${roomDesign.share_token}`;
        await navigator.clipboard.writeText(url);

        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="group overflow-hidden rounded-xl border-2 border-gray-400 bg-white transition hover:border-accent-300 hover:shadow-md">
            <Link href={route('room-designs.edit', roomDesign.id)}>
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
            </Link>

            <div className="flex items-center justify-between p-4">
                <Link
                    href={route('room-designs.edit', roomDesign.id)}
                    className="font-medium text-gray-900 group-hover:text-accent-700"
                >
                    {roomDesign.name}
                </Link>

                <button
                    type="button"
                    onClick={copyShareLink}
                    className="text-sm font-medium text-accent-600 hover:text-accent-700"
                >
                    {copied ? 'Copied!' : 'Share'}
                </button>
            </div>
        </div>
    );
}
