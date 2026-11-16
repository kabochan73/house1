import AuthenticatedHeader from '@/Components/AuthenticatedHeader';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen">
            <AuthenticatedHeader />

            <main>{children}</main>
        </div>
    );
}
