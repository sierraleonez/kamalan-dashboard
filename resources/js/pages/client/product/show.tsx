import ProductDetailLayout, { ProductDetailData } from "@/components/layout/product-detail";
import Navbar from "@/components/Navbar";
import RegistryCart from "@/components/registry-cart";
import RegistryCheckoutDialog from "@/components/registry-checkout-dialog";
import { InertiaPageProps, ViewMode } from "@/types";
import { DeliveryInfo, Registry, Product as RegistryProduct, GiftCart } from "@/types/response";
import { Head, router } from "@inertiajs/react";
import { useGuestCartHook } from "@/hooks/use-guest-cart-hook";
import { useState } from "react";

interface ShowProductProps extends InertiaPageProps {
    product: ProductDetailData;
    registry?: Registry & { 
        delivery_info: DeliveryInfo;
        products?: Array<RegistryProduct & { pivot: GiftCart }>;
    };
}

export default function ShowProduct({ product, registry, auth }: ShowProductProps) {
    const isRegistryView = !!registry;
    const viewMode: ViewMode = isRegistryView ? 'share-registry' : 'store';
    const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
    
    // Use guest cart hook for non-registry views
    const {
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        handleContinue
    } = useGuestCartHook();

    const handleAddToCart = () => {
        addToCart(product);
        
        // Show checkout dialog after adding to cart (only in registry view)
        if (isRegistryView) {
            setShowCheckoutDialog(true);
        }
    };

    // Get remaining products (not in cart)
    const remainingProducts = registry?.products?.filter(
        p => !cartItems.some(item => item.id === p.id)
    ) || [];

    const handleProductClick = (productId: number) => {
        setShowCheckoutDialog(false);
        // Navigate to the selected product with registry_id
        const url = `/products/${productId}?registry_id=${registry?.id}`;
        router.visit(url);
    };

    const handleCheckoutContinue = () => {
        setShowCheckoutDialog(false);
        // Navigate to checkout page
        router.visit(`/registry/checkout/${registry?.id}`);
    };

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title={`${product.name} - Kamalan`} />

            {/* Header */}
            <Navbar showRegistryBreadcrumbs={false} />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="flex lg:gap-8">
                    <ProductDetailLayout
                        product={product}
                        onAddToCart={handleAddToCart}
                        isInCart={cartItems.some(item => item.id === product.id)}
                        registry={registry}
                        viewMode={'store'}
                    />
                    
                    {isRegistryView && (
                        <RegistryCart
                            registryTitle="Shopping Cart"
                            items={cartItems}
                            onUpdateQuantity={updateCartQuantity}
                            onRemoveItem={removeFromCart}
                            onContinue={handleContinue}
                        />
                    )}
                </div>
            </div>

            {/* Checkout Confirmation Dialog (Registry view only) */}
            {isRegistryView && registry && (
                <RegistryCheckoutDialog
                    open={showCheckoutDialog}
                    onOpenChange={setShowCheckoutDialog}
                    registryOwnerName={registry.delivery_info.receiver_name}
                    remainingProducts={remainingProducts}
                    onProductClick={handleProductClick}
                    onContinue={handleCheckoutContinue}
                />
            )}
        </div>
    )
}