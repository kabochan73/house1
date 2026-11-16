import PublicHeader from '@/Components/PublicHeader';
import { Head, Link } from '@inertiajs/react';

const steps = [
    {
        title: 'Pick a room',
        description: 'いくつかの部屋テンプレートから選びます。',
    },
    {
        title: 'Place furniture',
        description: 'ソファや椅子、テーブルなどを自由に配置できます。',
    },
    {
        title: 'Save & Share',
        description:
            '気に入ったレイアウトはダッシュボードに保存、リンクで共有もできます。',
    },
];

export default function Welcome({ auth, canRegister }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-white">
                <PublicHeader />

                <main className="mx-auto max-w-5xl px-6 py-20 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                        ブラウザの中で模様替えアプリ
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
                        部屋を選んで、家具を置いて、雰囲気を確かめよう。
                        <br />
                        気に入ったレイアウトは保存して、共有できます。
                    </p>


                    <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
                        {steps.map((step, index) => (
                            <div
                            key={step.title}
                                className="rounded-xl border border-gray-400 p-6"
                                >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-sm font-semibold text-accent-700">
                                        {index + 1}
                                    </div>
                                    <h2 className="font-bold text-gray-900 text-lg">
                                        {step.title}
                                    </h2>
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                        {canRegister && !auth.user && (
                            <Link
                                href={route('register')}
                                className="mt-12 inline-block rounded-md text-2xl font-bold bg-accent-500 px-6 py-3  text-white hover:bg-accent-600"
                            >
                                Start Now
                            </Link>
                        )}
                </main>

            </div>
        </>
    );
}
