import DangerButton from '@/Components/DangerButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Edit({ roomDesign, furnitureCatalog }) {
    const destroy = () => {
        router.delete(route('room-designs.destroy', roomDesign.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {roomDesign.name}
                </h2>
            }
        >
            <Head title={roomDesign.name} />

            <div className="py-12">
                <div className="mx-auto flex max-w-7xl gap-6 sm:px-6 lg:px-8">
                    <aside className="flex w-64 flex-col justify-between rounded-lg bg-white p-4 shadow">
                        <div>
                            <h3 className="mb-2 font-semibold text-gray-800">
                                Furniture
                            </h3>
                            <ul className="space-y-1 text-sm text-gray-600">
                                {furnitureCatalog.map((furniture) => (
                                    <li key={furniture.id}>
                                        {furniture.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <DangerButton onClick={destroy}>Delete</DangerButton>
                    </aside>

                    <div className="flex-1 rounded-lg bg-white p-4 shadow">
                        <p className="text-sm text-gray-600">
                            3D editor coming soon. Room template:{' '}
                            {roomDesign.room_template}
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
