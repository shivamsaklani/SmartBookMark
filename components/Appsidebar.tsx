"use client"
import { Bookmark, Star, FolderOpen, Tag } from 'lucide-react';

import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAppSelector } from '@/hooks/use-redux';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
    { title: 'All Bookmarks', url: '/dashboard', icon: Bookmark },
    { title: 'Favorites', url: '/dashboard/favorites', icon: Star },
    { title: 'Collections', url: '/dashboard/collections', icon: FolderOpen },
    { title: 'Tags', url: '/dashboard/tags', icon: Tag },
];

export function AppSidebar() {
    const path = usePathname();
    const { bookmarks } = useAppSelector((state) => state.bookmark);
    const favCount = bookmarks.filter(b => b.isFavorite).length;

    return (
        <Sidebar className="border-r-0">
            <div className="flex h-14 items-center gap-2 px-4 border-b border-sidebar-border">
                <Bookmark className="h-5 w-5 text-sidebar-primary" />
                <span className="font-semibold text-sidebar-foreground text-lg">Bookmark</span>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/50">Navigate</SidebarGroupLabel>
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
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-medium">
                        JD
                    </div>
                    <div className="text-sm">
                        <p className="font-medium text-sidebar-foreground">Jane Doe</p>
                        <p className="text-sidebar-foreground/50 text-xs">jane@example.com</p>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}
