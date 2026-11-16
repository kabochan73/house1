import { Link } from '@inertiajs/react';

export default function PublicHeader() {
    return (
        <header className="border-b border-accent-800 px-6 py-4">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-4xl font-bold tracking-tight text-accent-500 hover:text-accent-600"
                >
                    <svg
                        className="size-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 11.5 12 4l9 7.5" />
                        <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
                        <path d="M9.5 20v-6h5v6" />
                    </svg>
                    Room Makeover
                </Link>

                <nav className="flex items-center font-bold gap-4 text-xl">
                    <Link
                        href={route('login')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Log in
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-md bg-accent-500 px-4 py-2  text-white hover:bg-accent-600"
                    >
                        Register
                    </Link>
                </nav>
            </div>
        </header>
    );
}
