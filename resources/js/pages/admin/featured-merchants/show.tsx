import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';

interface Merchant {
    id: number;
    name: string;
    shop_location?: string;
    shopee_link?: string;
    tokped_link?: string;
}

interface FeaturedMerchant {
    id: number;
    merchant_id: number;
    priority: number;
    subscription_date_start: string;
    subscription_date_end: string;
    merchant: Merchant;
}

interface Props {
    featuredMerchant: FeaturedMerchant;
}

export default function FeaturedMerchantShow({ featuredMerchant }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout title={`Featured Merchant: ${featuredMerchant.merchant.name}`}>
            <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Featured Merchant Details</h1>
                    <div className="flex gap-2">
                        <a 
                            href={admin.featuredMerchants.edit(featuredMerchant.id).url}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Edit
                        </a>
                        <a 
                            href={admin.featuredMerchants.index().url}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            ← Back to featured merchants
                        </a>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{featuredMerchant.merchant.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="mb-2">
                            <span className="font-semibold">Featured ID:</span> {featuredMerchant.id}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Merchant:</span> {featuredMerchant.merchant.name}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Priority:</span> 
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
                                {featuredMerchant.priority}
                            </span>
                        </div>
                        {featuredMerchant.merchant.shop_location && (
                            <div className="mb-2">
                                <span className="font-semibold">Location:</span> {featuredMerchant.merchant.shop_location}
                            </div>
                        )}
                        <div className="mb-2">
                            <span className="font-semibold">Subscription Period:</span>
                            <div className="ml-4 mt-2 space-y-1">
                                <div>Start: {formatDate(featuredMerchant.subscription_date_start)}</div>
                                <div>End: {formatDate(featuredMerchant.subscription_date_end)}</div>
                            </div>
                        </div>
                        {featuredMerchant.merchant.shopee_link && (
                            <div className="mb-2">
                                <span className="font-semibold">Shopee Link:</span> 
                                <a 
                                    href={featuredMerchant.merchant.shopee_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 ml-2"
                                >
                                    Visit Store
                                </a>
                            </div>
                        )}
                        {featuredMerchant.merchant.tokped_link && (
                            <div className="mb-2">
                                <span className="font-semibold">Tokopedia Link:</span> 
                                <a 
                                    href={featuredMerchant.merchant.tokped_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 ml-2"
                                >
                                    Visit Store
                                </a>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
