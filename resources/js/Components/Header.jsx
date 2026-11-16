import { Link } from '@inertiajs/react';

export default function Header({ children }) {
    return (
        <header className="border-b border-gray-100 px-6 py-6">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-accent-600"
                >
                    Room Craft
                </Link>

                {children && (
                    <nav className="flex items-center gap-4 text-sm">
                        {children}
                    </nav>
                )}
            </div>
        </header>
    );
}
