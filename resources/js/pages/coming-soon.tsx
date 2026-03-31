import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';

export default function ComingSoon() {
    return (
        <div className="min-h-screen bg-[oklch(1_0_0)] flex flex-col">
            <Head title="Coming Soon - Kamalan" />
            
            {/* Header */}
            {/* <Navbar showRegistryBreadcrumbs={false} /> */}

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-8">
                    <img
                        src="/kamalan_logo_green.png"
                        alt="Kamalan"
                        className="h-32 md:h-40 lg:h-48 w-auto"
                    />
                    <h1 className="text-primary font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-center px-4">
                        Coming Soon
                    </h1>
                </div>
            </div>
        </div>
    );
}
