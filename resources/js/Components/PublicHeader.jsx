import { Link } from '@inertiajs/react';

export default function PublicHeader() {
    return (
        <header className="border-b border-accent-800 px-6 py-4">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                <Link
                    href="/"
                    className="text-4xl font-bold tracking-tight text-accent-500 hover:text-accent-600"
                >
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
