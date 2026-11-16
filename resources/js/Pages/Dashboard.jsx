import RoomDesignCard from '@/Components/Dashboard/RoomDesignCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ roomDesigns }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>

                    <Link
                        href={route('room-designs.create')}
                        className="rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
                    >
                        New
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {roomDesigns.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
                        <p className="text-gray-600">
                            You haven't created a room yet.
                        </p>
                        <Link
                            href={route('room-designs.create')}
                            className="mt-4 inline-block rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
                        >
                            Create your first room
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {roomDesigns.map((roomDesign) => (
                            <RoomDesignCard
                                key={roomDesign.id}
                                roomDesign={roomDesign}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
