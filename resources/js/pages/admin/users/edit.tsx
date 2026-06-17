import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
import usersRoute from '@/routes/admin/users';

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    disabled_at: string | null;
    created_at: string;
};

interface Props {
    user: User;
    lastActive: string | null;
    errors?: Record<string, string[]>;
}

export default function UserEdit({ user, lastActive, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        name: user.name,
        email: user.email,
        disabled: !!user.disabled_at,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setData(name as keyof typeof data, type === 'checkbox' ? (e.target as HTMLInputElement).checked : value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(usersRoute.update(user.id).url);
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Users', href: '/admin/users' },
            { title: user.name, href: `/admin/users/${user.id}/edit` },
        ]}>
            <h1 className="sr-only">Edit User</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-5 mt-8">
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <h2 className="text-lg font-semibold">Edit User</h2>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={data.name} onChange={handleChange} required placeholder="User name" />
                        <InputError message={errors.name?.[0]} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} required placeholder="Email address" />
                        <InputError message={errors.email?.[0]} />
                    </div>

                    <div className="border-t border-border pt-4">
                        <h3 className="text-md font-semibold mb-2">Account Info</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p><span className="font-medium">Registered:</span> {user.created_at}</p>
                            <p><span className="font-medium">Email Verified:</span> {user.email_verified_at || 'Not verified'}</p>
                            <p><span className="font-medium">Last Active:</span> {lastActive || '-'}</p>
                        </div>
                    </div>

                    <div className="border-t border-border pt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="disabled"
                                checked={data.disabled}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <div>
                                <span className="font-medium text-red-600">Disable User</span>
                                <p className="text-sm text-muted-foreground">User will not be able to log in</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
