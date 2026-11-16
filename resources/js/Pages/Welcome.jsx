import Header from '@/Components/Header';
import { Head, Link } from '@inertiajs/react';

const steps = [
    {
        title: 'Pick a room',
        description: 'Choose from a few room templates to start with.',
    },
    {
        title: 'Place furniture',
        description: 'Drag sofas, chairs, tables and more into the space.',
    },
    {
        title: 'Save & share',
        description: 'Keep your layout on your dashboard, or share it with a link.',
    },
];

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-white">
                <Header>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md bg-accent-500 px-4 py-2 font-medium text-white hover:bg-accent-600"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            {canLogin && (
                                <Link
                                    href={route('login')}
                                    className="font-medium text-gray-600 hover:text-gray-900"
                                >
                                    Log in
                                </Link>
                            )}
                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-accent-500 px-4 py-2 font-medium text-white hover:bg-accent-600"
                                >
                                    Sign up
                                </Link>
                            )}
                        </>
                    )}
                </Header>

                <main className="mx-auto max-w-5xl px-6 py-20 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Redecorate any room,
                        <br />
                        right in your browser
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
                        Pick a room, drop in some furniture, and see how it
                        feels. Save your favorite layouts and share them with
                        anyone.
                    </p>

                    {canRegister && !auth.user && (
                        <Link
                            href={route('register')}
                            className="mt-8 inline-block rounded-md bg-accent-500 px-6 py-3 font-medium text-white hover:bg-accent-600"
                        >
                            Get started
                        </Link>
                    )}

                    <div className="mt-24 grid gap-8 text-left sm:grid-cols-3">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="rounded-xl border border-gray-200 p-6"
                            >
                                <div className="flex size-8 items-center justify-center rounded-full bg-accent-100 text-sm font-semibold text-accent-700">
                                    {index + 1}
                                </div>
                                <h2 className="mt-4 font-semibold text-gray-900">
                                    {step.title}
                                </h2>
                                <p className="mt-2 text-sm text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </main>

                <footer className="py-10 text-center text-sm text-gray-400">
                    Room Craft
                </footer>
            </div>
        </>
    );
}
