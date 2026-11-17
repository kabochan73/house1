import useEditorStore from '@/stores/useEditorStore';

export default function FurnitureCatalogPanel({ furnitureCatalog }) {
    const addItem = useEditorStore((state) => state.addItem);

    const categories = furnitureCatalog.reduce((groups, furniture) => {
        groups[furniture.category] ??= [];
        groups[furniture.category].push(furniture);
        return groups;
    }, {});

    return (
        <div className="space-y-4">
            {Object.entries(categories).map(([category, variants]) => (
                <div key={category}>
                    <p className="mb-1 text-lg font-bold uppercase tracking-wide text-gray-700">
                        {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {variants.map((furniture) => (
                            <button
                                key={furniture.id}
                                type="button"
                                onClick={() => addItem(furniture)}
                                className="rounded-md border border-gray-600 px-2 py-1 text-sm font-medium text-gray-900 hover:border-accent-400 hover:text-accent-700"
                            >
                                {furniture.name}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
