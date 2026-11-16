export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <span
            className={`font-bold tracking-tight text-accent-600 ${className}`}
            {...props}
        >
            RoomCraft
        </span>
    );
}
