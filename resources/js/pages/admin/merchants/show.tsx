import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import merchantsRoute from '@/routes/admin/merchants';

interface Merchant {
    id: number;
    name: string;
    shopee_link?: string;
    tokped_link?: string;
    shop_location?: string;
}

interface Props {
    merchant: Merchant;
}

export default function MerchantShow({ merchant }: Props) {
    return (
        <AppLayout title={`Merchant: ${merchant.name}`}>
            <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Merchant Details</h1>
                    <div className="flex gap-2">
                        <a 
                            href={`/admin/merchants/${merchant.id}/edit`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Edit
                        </a>
                        <a 
                            href={merchantsRoute.index().url}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            ← Back to merchants
                        </a>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{merchant.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="mb-2">
                            <span className="font-semibold">ID:</span> {merchant.id}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Name:</span> {merchant.name}
                        </div>
                        {merchant.shopee_link && (
                            <div className="mb-2">
                                <span className="font-semibold">Shopee Link:</span> 
                                <a 
                                    href={merchant.shopee_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 ml-2"
                                >
                                    {merchant.shopee_link}
                                </a>
                            </div>
                        )}
                        {merchant.tokped_link && (
                            <div className="mb-2">
                                <span className="font-semibold">Tokopedia Link:</span> 
                                <a 
                                    href={merchant.tokped_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 ml-2"
                                >
                                    {merchant.tokped_link}
                                </a>
                            </div>
                        )}
                        {merchant.shop_location && (
                            <div className="mb-2">
                                <span className="font-semibold">Shop Location:</span> {merchant.shop_location}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}