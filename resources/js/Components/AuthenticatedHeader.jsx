import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedHeader() {
    const user = usePage().props.auth.user;

    return (
        <header className="border-b border-accent-800 bg-white px-6 py-4">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                <Link
                    href={route('dashboard')}
                    className="text-4xl font-bold tracking-tight text-accent-500 hover:text-accent-600"
                >
                    Room Makeover
                </Link>

                <nav className="flex items-center gap-4 text-xl font-bold">
                    <Link
                        href={route('profile.edit')}
                        className="rounded-md bg-accent-500 px-4 py-2 text-white hover:bg-accent-600"
                    >
                        {user.name}
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-red-800 hover:text-red-900"
                    >
                        Log Out
                    </Link>
                </nav>
            </div>
        </header>
    );
}
