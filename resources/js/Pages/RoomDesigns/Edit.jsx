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
        <AuthenticatedLayout>
            <Head title={roomDesign.name} />

            <div className="flex">
                <aside className="flex w-64 shrink-0 flex-col justify-between border-r-2 border-gray-400 bg-white">
                    <div className="space-y-6 p-4">
                        <p className="border-b-2 border-gray-400 pb-4 text-2xl font-bold text-gray-800">
                            {name}
                        </p>

                        <div>
                            <h3 className="mb-3 text-2xl font-bold text-gray-800">
                                Furniture
                            </h3>
                            <FurnitureCatalogPanel
                                furnitureCatalog={furnitureCatalog}
                            />
                        </div>

                        {selectedId !== null && (
                            <div className="border-t-2 border-gray-400 pt-4">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
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

                    <div className="flex flex-col gap-2 border-t-2 border-gray-400 p-4">
                        <PrimaryButton
                            disabled={saving}
                            onClick={save}
                            style={{ justifyContent: 'flex-start' }}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </PrimaryButton>
                        <DangerButton
                            onClick={destroy}
                            style={{ justifyContent: 'flex-start' }}
                        >
                            Delete
                        </DangerButton>
                    </div>
                </aside>

                <div className="h-[640px] flex-1 overflow-hidden bg-white">
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
