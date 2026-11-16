import PublicHeader from '@/Components/PublicHeader';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <PublicHeader />

            <div className="flex flex-col items-center pt-6 sm:pt-12">
                <div className="w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
