import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';

interface GiftCartItem {
    id: number;
    product: {
        id: number;
        name: string;
        formatted_price: string;
    };
    quantity: number;
}

interface ReservationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    giftCartItem: GiftCartItem;
}

export default function ReservationDialog({ isOpen, onClose, giftCartItem }: ReservationDialogProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        registry_gift_cart_id: giftCartItem.id,
        name: '',
        is_anonymous: false,
        greeting: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reservations', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Reserve Product</DialogTitle>
                    <DialogDescription>
                        You're reserving <strong>{giftCartItem.product.name}</strong> (x{giftCartItem.quantity})
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Name Input */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">
                            Your Name {!data.is_anonymous && '*'}
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter your name"
                            disabled={data.is_anonymous}
                            required={!data.is_anonymous}
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Anonymous Checkbox */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_anonymous"
                            checked={data.is_anonymous}
                            onCheckedChange={(checked) => {
                                setData('is_anonymous', checked as boolean);
                                if (checked) {
                                    setData('name', '');
                                }
                            }}
                        />
                        <label
                            htmlFor="is_anonymous"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Make it anonymous
                        </label>
                    </div>

                    {/* Greeting Textarea */}
                    <div className="grid gap-2">
                        <Label htmlFor="greeting">Message (Optional)</Label>
                        <Textarea
                            id="greeting"
                            name="greeting"
                            value={data.greeting}
                            onChange={(e) => setData('greeting', e.target.value)}
                            placeholder="Write a message for the registry owner..."
                            rows={4}
                        />
                        <InputError message={errors.greeting} />
                    </div>

                    {/* Error for registry_gift_cart_id (already reserved) */}
                    {errors.registry_gift_cart_id && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
                            {errors.registry_gift_cart_id}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Reserving...' : 'Reserve Gift'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
