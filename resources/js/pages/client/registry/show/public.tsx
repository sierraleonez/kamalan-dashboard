import Navbar from "@/components/Navbar";
import RegistryCard from "@/components/RegistryCard";
import { ShareRegistryResponse } from "@/types/response";
import { Head } from "@inertiajs/react";

interface PageProps {
    registry: ShareRegistryResponse;
};

export default function PublicRegistry(props: PageProps) {
    const registryData = props?.registry;
    console.log('registryData', registryData)
    return (
        <>
            <Head/>
            <Navbar />

            <div className="py-8 px-4">
                {/* Hero Text */}
                <div className="text-center mb-8">
                    <p className="text-lg text-[--primary] font-medium">
                        {registryData?.delivery_info?.receiver_name} membagikan registry ini dengan kamu
                    </p>
                </div>
                
                <RegistryCard registryData={registryData} />
            </div>
        </>
    )
}