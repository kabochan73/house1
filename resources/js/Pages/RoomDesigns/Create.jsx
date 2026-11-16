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
                <h1 className="text-3xl font-semibold text-gray-800">
                    Choose a room
                </h1>
                <p className="mb-6 mt-1 text-sm text-gray-600">
                    Pick a room to start placing furniture in.
                </p>

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
