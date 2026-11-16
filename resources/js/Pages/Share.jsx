import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';

export default function Share({ roomDesign }) {
    const copy = () => {
        router.post(route('share.copy', roomDesign.share_token));
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-12">
            <Head title={roomDesign.name} />

            <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow">
                <h1 className="text-xl font-semibold text-gray-800">
                    {roomDesign.name}
                </h1>

                {roomDesign.thumbnail && (
                    <img
                        src={`/storage/${roomDesign.thumbnail}`}
                        alt={roomDesign.name}
                        className="mt-4 w-full rounded"
                    />
                )}

                <div className="mt-6 flex items-center justify-between">
                    <Link href={route('welcome')} className="text-sm text-gray-600 underline">
                        Try this app
                    </Link>

                    <PrimaryButton onClick={copy}>
                        Add to my dashboard
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
