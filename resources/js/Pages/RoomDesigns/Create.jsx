import RoomTemplateCard from '@/Components/RoomPicker/RoomTemplateCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Create({ roomTemplates }) {
    const selectTemplate = (roomTemplate) => {
        router.post(route('room-designs.store'), { room_template: roomTemplate });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Choose a room
                </h2>
            }
        >
            <Head title="Choose a room" />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <p className="mb-6 text-sm text-gray-600">
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
