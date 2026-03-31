import type { ReactNode } from 'react';
import type { BreadcrumbItem } from './navigation';

export type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
};

export interface InertiaPageProps {
    auth: {
        user: any; // Adjust this type based on your actual user object structure
    };
    errors: any;
    flash: any;
    name: string;
}

export type ViewMode = 'store' | 'select-gift' | 'share-registry';
