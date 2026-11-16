import { create } from 'zustand';

let nextClientId = -1;

const useEditorStore = create((set, get) => ({
    name: '',
    items: [],
    selectedId: null,

    initialize({ name, items }) {
        set({
            name,
            items: items.map((item) => ({
                id: item.id,
                furnitureCatalogId: item.furniture_catalog_id,
                modelPath: item.furniture_catalog.model_path,
                defaultScale: item.furniture_catalog.default_scale,
                position: [item.position_x, item.position_y, item.position_z],
                rotationY: item.rotation_y,
            })),
            selectedId: null,
        });
    },

    setName(name) {
        set({ name });
    },

    addItem(furniture) {
        const id = nextClientId--;

        set((state) => ({
            items: [
                ...state.items,
                {
                    id,
                    furnitureCatalogId: furniture.id,
                    modelPath: furniture.model_path,
                    defaultScale: furniture.default_scale,
                    position: [0, 0, 0],
                    rotationY: 0,
                },
            ],
            selectedId: id,
        }));
    },

    updateItemTransform(id, position, rotationY) {
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, position, rotationY } : item,
            ),
        }));
    },

    removeItem(id) {
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId,
        }));
    },

    selectItem(id) {
        set({ selectedId: id });
    },

    toPayload() {
        const { name, items } = get();

        return {
            name,
            items: items.map((item) => ({
                furniture_catalog_id: item.furnitureCatalogId,
                position_x: item.position[0],
                position_y: item.position[1],
                position_z: item.position[2],
                rotation_y: item.rotationY,
            })),
        };
    },
}));

export default useEditorStore;
