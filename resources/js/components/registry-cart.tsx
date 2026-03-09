import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface RegistryCartProps {
    registryTitle?: string;
    items?: CartItem[];
    onUpdateQuantity?: (id: number, quantity: number) => void;
    onRemoveItem?: (id: number) => void;
    onContinue?: () => void;
}

export default function RegistryCart({
    registryTitle = "Mawar's Wedding Registry",
    items = [],
    onUpdateQuantity,
    onRemoveItem,
    onContinue
}: RegistryCartProps) {
    console.log(items.length === 0)
    const [isOpen, setIsOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleQuantityChange = (id: number, increment: boolean) => {
        const item = items.find(i => i.id === id);
        if (!item) return;

        const newQuantity = increment ? item.quantity + 1 : Math.max(0, item.quantity - 1);

        if (newQuantity === 0) {
            handleRemoveClick(id);
        } else {
            onUpdateQuantity?.(id, newQuantity);
        }
    };

    const handleRemoveClick = (id: number) => {
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmRemove = () => {
        if (itemToDelete !== null) {
            onRemoveItem?.(itemToDelete);
            setDeleteDialogOpen(false);
            setItemToDelete(null);
        }
    };

    const cancelRemove = () => {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const CartContent = () => (
        <div className="flex flex-col h-full">
            {/* Registry Title - Centered */}

            {/* Cart Container with Light Green Border */}
            {/* <div className="flex-1 border border-primary/30 rounded-lg bg-background p-4"> */}
            {/* Cart Items */}
            <div className="space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]  overflow-y-auto mb-6 flex-1 min-h-0 pr-2">
                {items.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        <p className="font-inter">Tidak ada item di registry</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="space-y-2">
                            <div className="flex items-start gap-3">
                                {/* Product Image */}
                                <div className="w-20 h-20 shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1">
                                    <h4 className="font-serif text-sm font-medium text-foreground leading-tight">
                                        {item.name}
                                    </h4>
                                </div>
                            </div>

                            {/* Actions Row */}
                            <div className="flex justify-between items-center">
                                {/* Hapus Button */}
                                <div className='flex-1'>
                                    <button
                                        onClick={() => handleRemoveClick(item.id)}
                                        className="font-inter text-sm text-gray-600 hover:text-red-600 transition-colors"
                                    >
                                        Hapus
                                    </button>

                                </div>

                                {/* Quantity Selector */}
                                <div className="flex-1 flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="w-6 h-6 p-0 text-gray-600 hover:text-primary"
                                        onClick={() => handleQuantityChange(item.id, false)}
                                    >
                                        <Minus className="w-3 h-3" />
                                    </Button>
                                    <span className="font-inter text-sm font-medium min-w-[20px] text-center">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="w-6 h-6 p-0 text-gray-600 hover:text-primary"
                                        onClick={() => handleQuantityChange(item.id, true)}
                                    >
                                        <Plus className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer Action - Selesai Pilih Button */}
            <div className="pt-4 border-t border-gray-200">
                <Button
                    disabled={items.length === 0}
                    onClick={onContinue}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter"
                    size="lg"
                >
                    Selesai Pilih
                </Button>
            </div>
            {/* </div> */}
        </div>
    );

    return (
        <>
            {/* Desktop Cart - Fixed Position */}
            <div className="hidden lg:block sticky right-8 top-32 w-60 h-[calc(100vh-200px)] z-40">
                <div className="mb-6">
                    <h2 className="font-serif text-xl font-medium text-primary text-center">
                        {registryTitle}
                    </h2>
                </div>
                <Card className="h-full py-4 px-2 border-primary rounded-none  shadow-lg bg-white">
                    <CartContent />
                </Card>
            </div>

            {/* Mobile Floating Button */}
            <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg z-50"
                            size="lg"
                        >
                            <div className="relative">
                                <ShoppingCart className="w-6 h-6" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </div>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-96 p-0">
                        <div className="flex flex-col h-full p-6">
                            <SheetHeader className="mb-6">
                                <SheetTitle className="font-serif text-xl text-primary text-center">
                                    {registryTitle}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex-1 overflow-hidden">
                                {/* Mobile Cart Container with Light Green Border */}
                                <div className="border border-primary/30 rounded-lg bg-background p-4 h-full flex flex-col">
                                    {/* Cart Items */}
                                    <div className="space-y-4 mb-6 flex-1 min-h-0 pr-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {items.length === 0 ? (
                                            <div className="text-center text-gray-500 py-8">
                                                <p className="font-inter">Tidak ada item di registry</p>
                                            </div>
                                        ) : (
                                            items.map((item) => (
                                                <div key={item.id} className="space-y-2">
                                                    <div className="flex items-start gap-3">
                                                        {/* Product Image */}
                                                        <div className="w-12 h-12 shrink-0">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover rounded"
                                                            />
                                                        </div>

                                                        {/* Product Info */}
                                                        <div className="flex-1">
                                                            <h4 className="font-serif text-sm font-medium text-foreground leading-tight">
                                                                {item.name}
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    {/* Actions Row */}
                                                    <div className="flex">
                                                        {/* Hapus Button */}
                                                        <button
                                                            onClick={() => handleRemoveClick(item.id)}
                                                            className="font-inter text-sm text-gray-600 hover:text-red-600 transition-colors"
                                                        >
                                                            Hapus
                                                        </button>

                                                        {/* Quantity Selector */}
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="w-6 h-6 p-0 text-gray-600 hover:text-primary"
                                                                onClick={() => handleQuantityChange(item.id, false)}
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </Button>
                                                            <span className="font-inter text-sm font-medium min-w-[20px] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="w-6 h-6 p-0 text-gray-600 hover:text-primary"
                                                                onClick={() => handleQuantityChange(item.id, true)}
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Footer Action - Selesai Pilih Button */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <Button
                                            disabled={items.length === 0}
                                            onClick={() => {
                                                onContinue?.();
                                                setIsOpen(false);
                                            }}
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter"
                                            size="lg"
                                        >
                                            Selesai Pilih
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Item dari Registry?</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus item ini dari registry? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={cancelRemove}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmRemove}
                        >
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}