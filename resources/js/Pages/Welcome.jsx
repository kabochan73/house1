import DemoRoomCanvas from '@/Components/Scene/DemoRoomCanvas';
import PublicHeader from '@/Components/PublicHeader';
import { Head, Link } from '@inertiajs/react';

const steps = [
    {
        title: 'Pick a room',
        description: 'いくつかの部屋テンプレートから選びます。',
        icon: (
            <svg
                className="size-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 17v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
                <path d="M4 17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1" />
                <path d="M6 12V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
            </svg>
        ),
    },
    {
        title: 'Place furniture',
        description: 'ソファや椅子、テーブルなどを自由に配置できます。',
        icon: (
            <svg
                className="size-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M6 20v-3" />
                <path d="M18 20v-3" />
                <path d="M5 17h14a1 1 0 0 0 1-1v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1Z" />
                <path d="M7 12V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6" />
            </svg>
        ),
    },
    {
        title: 'Save & Share',
        description:
            '気に入ったレイアウトはダッシュボードに保存し、リンクで共有もできます。',
        icon: (
            <svg
                className="size-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="18" cy="5" r="2.5" />
                <circle cx="6" cy="12" r="2.5" />
                <circle cx="18" cy="19" r="2.5" />
                <path d="M8.2 10.8 15.8 6.2" />
                <path d="M8.2 13.2 15.8 17.8" />
            </svg>
        ),
    },
];

export default function Welcome({ auth, canRegister }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-white">
                <PublicHeader />

                <main className="mx-auto max-w-6xl px-6 py-20">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                                ブラウザの中で模様替えアプリ
                            </h1>
                            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 lg:mx-0">
                                部屋を選んで、家具を置いて、雰囲気を確かめよう。
                                <br />
                                気に入ったレイアウトは保存して、共有できます。
                            </p>

                            <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.title}
                                        className="rounded-xl border border-gray-400 p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-sm font-semibold text-accent-700">
                                                {index + 1}
                                            </div>
                                            <span className="text-accent-500">
                                                {step.icon}
                                            </span>
                                        </div>
                                        <h2 className="mt-3 text-lg font-bold text-gray-900">
                                            {step.title}
                                        </h2>
                                        <p className="mt-2 text-sm text-gray-600">
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {canRegister && !auth.user && (
                                <Link
                                    href={route('register')}
                                    className="mt-12 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-2xl font-bold text-white hover:bg-accent-600"
                                >
                                    Start Now
                                    <svg
                                        className="size-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m13 6 6 6-6 6" />
                                    </svg>
                                </Link>
                            )}
                        </div>

                        <div className="h-[420px] overflow-hidden rounded-2xl bg-gray-50">
                            <DemoRoomCanvas />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
