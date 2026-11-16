export default function useCaptureThumbnail(glRef) {
    return () => {
        if (!glRef.current) {
            return null;
        }

        return glRef.current.domElement.toDataURL('image/png');
    };
}
