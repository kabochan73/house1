import PrimaryButton from '@/Components/PrimaryButton';
import PublicHeader from '@/Components/PublicHeader';
import { Head, Link, router } from '@inertiajs/react';

export default function Share({ roomDesign }) {
    const copy = () => {
        router.post(route('share.copy', roomDesign.share_token));
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title={roomDesign.name} />

            <PublicHeader />

            <div className="mx-auto max-w-5xl px-6 py-12">
                <div className="mx-auto max-w-xl overflow-hidden rounded-xl border-2 border-gray-400 bg-white">
                    {roomDesign.thumbnail && (
                        <img
                            src={`/storage/${roomDesign.thumbnail}`}
                            alt={roomDesign.name}
                            className="aspect-video w-full object-cover"
                        />
                    )}

                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {roomDesign.name}
                        </h1>

                        <div className="mt-6 flex items-center justify-between">
                            <Link
                                href={route('welcome')}
                                className="text-sm text-gray-600 underline"
                            >
                                Try this app
                            </Link>

                            <PrimaryButton onClick={copy}>
                                Add to my dashboard
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
