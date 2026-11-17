import RoomTemplateCard from '@/Components/RoomPicker/RoomTemplateCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Create({ roomTemplates }) {
    const selectTemplate = (roomTemplate) => {
        router.post(route('room-designs.store'), { room_template: roomTemplate });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Choose a room" />

            <div className="mx-auto max-w-5xl px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Choose a room
                </h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {roomTemplates.map((roomTemplate) => (
                        <RoomTemplateCard
                            key={roomTemplate}
                            roomTemplate={roomTemplate}
                            onSelect={selectTemplate}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
