import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/admin';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import categories from '@/routes/admin/categories';
import products from '@/routes/admin/products';
import merchants from '@/routes/admin/merchants';
import events from '@/routes/admin/events';
import featuredMerchants from '@/routes/admin/featured-merchants';
import featuredProducts from '@/routes/admin/featured-products';
import articles from '@/routes/admin/articles';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Categories',
        href: categories.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Events',
        href: events.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: products.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Merchants',
        href: merchants.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Featured Merchants',
        href: featuredMerchants.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Featured Products',
        href: featuredProducts.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Articles',
        href: articles.index(),
        icon: LayoutGrid,
    }
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
