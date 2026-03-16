import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    display_image: string;
    formatted_price?: string;
    pivot: {
        quantity: number;
    };
}

interface RegistryCheckoutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    registryOwnerName: string;
    remainingProducts: Product[];
    onProductClick: (productId: number) => void;
    onContinue: () => void;
}

export default function RegistryCheckoutDialog({
    open,
    onOpenChange,
    registryOwnerName,
    remainingProducts,
    onProductClick,
    onContinue
}: RegistryCheckoutDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-serif text-center">
                        Masih terdapat beberapa keinginan dari {registryOwnerName}
                    </DialogTitle>
                </DialogHeader>

                {/* Product List - Scrollable */}
                <div className="flex-1 overflow-y-auto min-h-0 space-y-2 py-4">
                    {remainingProducts.length > 0 ? (
                        <div className="space-y-2">
                            {remainingProducts.map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => onProductClick(item.id)}
                                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                                        {index + 1}
                                    </div>
                                    <img
                                        src={item.display_image}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between gap-2">
                                            <h4 className="text-sm font-medium text-foreground truncate">
                                                {item.name}
                                            </h4>
                                            <h4 className="text-sm font-medium text-foreground whitespace-nowrap">
                                                {item.formatted_price}
                                            </h4>
                                        </div>
                                        <p className="text-xs text-primary font-semibold">
                                            x{item.pivot.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            <Heart className="w-12 h-12 mx-auto mb-3 text-primary" />
                            <p>Semua keinginan sudah dipilih!</p>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        onClick={onContinue}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter"
                        size="lg"
                    >
                        Lanjutkan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
