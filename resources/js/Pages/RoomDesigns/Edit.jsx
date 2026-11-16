import FurnitureCatalogPanel from '@/Components/Editor/FurnitureCatalogPanel';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import RoomCanvas from '@/Components/Scene/RoomCanvas';
import useCaptureThumbnail from '@/hooks/useCaptureThumbnail';
import useEditorStore from '@/stores/useEditorStore';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Edit({ roomDesign, furnitureCatalog }) {
    const glRef = useRef();
    const captureThumbnail = useCaptureThumbnail(glRef);

    const name = useEditorStore((state) => state.name);
    const setName = useEditorStore((state) => state.setName);
    const selectedId = useEditorStore((state) => state.selectedId);
    const removeItem = useEditorStore((state) => state.removeItem);
    const toPayload = useEditorStore((state) => state.toPayload);
    const initialize = useEditorStore((state) => state.initialize);

    const [mode, setMode] = useState('translate');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        initialize(roomDesign);
    }, [roomDesign.id]);

    const save = () => {
        setSaving(true);

        router.put(
            route('room-designs.update', roomDesign.id),
            {
                ...toPayload(),
                thumbnail: captureThumbnail(),
            },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        );
    };

    const destroy = () => {
        router.delete(route('room-designs.destroy', roomDesign.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="rounded-md border-gray-300 text-xl font-semibold leading-tight text-gray-800 focus:border-accent-500 focus:ring-accent-500"
                />
            }
        >
            <Head title={roomDesign.name} />

            <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
                <aside className="flex w-64 shrink-0 flex-col justify-between rounded-lg bg-white p-4 shadow">
                    <div>
                        <h3 className="mb-2 font-semibold text-gray-800">
                            Furniture
                        </h3>
                        <FurnitureCatalogPanel
                            furnitureCatalog={furnitureCatalog}
                        />

                        {selectedId !== null && (
                            <div className="mt-6 border-t pt-4">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Selected item
                                </p>
                                <div className="flex gap-2">
                                    <SecondaryButton
                                        onClick={() => setMode('translate')}
                                        className={
                                            mode === 'translate'
                                                ? 'ring-2 ring-accent-400'
                                                : ''
                                        }
                                    >
                                        Move
                                    </SecondaryButton>
                                    <SecondaryButton
                                        onClick={() => setMode('rotate')}
                                        className={
                                            mode === 'rotate'
                                                ? 'ring-2 ring-accent-400'
                                                : ''
                                        }
                                    >
                                        Rotate
                                    </SecondaryButton>
                                </div>
                                <DangerButton
                                    className="mt-2 w-full"
                                    onClick={() => removeItem(selectedId)}
                                >
                                    Remove
                                </DangerButton>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 border-t pt-4">
                        <PrimaryButton disabled={saving} onClick={save}>
                            {saving ? 'Saving...' : 'Save'}
                        </PrimaryButton>
                        <DangerButton onClick={destroy}>Delete</DangerButton>
                    </div>
                </aside>

                <div className="h-[600px] flex-1 overflow-hidden rounded-lg bg-white shadow">
                    <RoomCanvas
                        ref={glRef}
                        roomTemplate={roomDesign.room_template}
                        mode={mode}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
