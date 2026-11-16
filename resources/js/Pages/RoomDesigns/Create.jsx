import PrimaryButton from '@/Components/PrimaryButton';
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

            <div className="py-12">
                <div className="mx-auto flex max-w-7xl gap-4 sm:px-6 lg:px-8">
                    {roomTemplates.map((roomTemplate) => (
                        <PrimaryButton
                            key={roomTemplate}
                            onClick={() => selectTemplate(roomTemplate)}
                        >
                            {roomTemplate}
                        </PrimaryButton>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
