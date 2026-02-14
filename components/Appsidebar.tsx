"use client"
import { Bookmark, Star, FolderOpen, Tag, LogOut } from 'lucide-react';

import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAppSelector } from '@/hooks/use-redux';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';

const navItems = [
    { title: 'All Bookmarks', url: '/dashboard', icon: Bookmark },
    { title: 'Favorites', url: '/dashboard/favorites', icon: Star },
    { title: 'Collections', url: '/dashboard/collections', icon: FolderOpen },
    { title: 'Tags', url: '/dashboard/tags', icon: Tag },
];

export function AppSidebar() {
    const path = usePathname();
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <Sidebar className="border-r-0">
            <div className="flex h-14 items-center gap-2 px-4 border-b border-sidebar-border">
                <Bookmark className="h-5 w-5 text-sidebar-primary" />
                <span className="font-semibold text-sidebar-foreground text-lg">Bookmarks</span>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors
    ${path === item.url
                                                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                                }`}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <div className="mt-auto border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3 mb-4">
                    {user?.user_metadata?.avatar_url ? (
                        <img
                            src={user.user_metadata.avatar_url}
                            alt={user.user_metadata.name || "User"}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-medium">
                            {user?.email?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
                    <div className="text-sm overflow-hidden">
                        <p className="font-medium text-sidebar-foreground truncate">
                            {user?.user_metadata?.name || "User"}
                        </p>
                        <p className="text-sidebar-foreground/50 text-xs truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-sidebar-foreground/70  dark:bg-red-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/50"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                </Button>
            </div>
        </Sidebar>
    );
}
