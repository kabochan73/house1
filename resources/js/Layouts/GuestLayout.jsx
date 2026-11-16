import PublicHeader from '@/Components/PublicHeader';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">
            <PublicHeader />

            <div className="mx-auto max-w-md px-6 pt-16 sm:pt-24">
                {children}
            </div>
        </div>
    );
}
