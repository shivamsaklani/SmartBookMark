"use client";

import { ReactNode, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Appsidebar";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "@/hooks/use-redux";
import {
  fetchBookmarks,
  fetchCollections,
  addBookmarkRealtime,
  updateBookmarkRealtime,
  deleteBookmarkRealtime,
} from "@/lib/BookmarkSlice";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/Auth";
import { User, Bookmark } from "@/lib/types";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email!,
          user_metadata: {
            name: session.user.user_metadata.full_name || session.user.email,
            avatar_url: session.user.user_metadata.avatar_url,
          },
        };
        dispatch(setUser(user));
      }
      // Removed generic router.push('/') redirect to avoid race conditions
    };

    checkAuth();
    dispatch(fetchBookmarks());
    dispatch(fetchCollections());

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            dispatch(deleteBookmarkRealtime(payload.old.id));
            return;
          }

          const fetchBookmark = async (id: string) => {
            const { data, error } = await supabase
              .from("bookmarks")
              .select("*, tags(tag(*))")
              .eq("id", id)
              .single();

            if (error || !data) return null;

            // Transform data to match Bookmark interface
            const formattedBookmark: Bookmark = {
              id: data.id,
              url: data.url,
              title: data.title,
              description: data.description,
              isFavorite: data.isFavorite,
              collectionId: data.collectionId,
              createdAt: data.createdAt,
              tags: data.tags.map((t: any) => t.tag.name),
            };
            return formattedBookmark;
          };

          if (payload.eventType === "INSERT") {
            const newBookmark = await fetchBookmark(payload.new.id);
            if (newBookmark) dispatch(addBookmarkRealtime(newBookmark));
          } else if (payload.eventType === "UPDATE") {
            const updatedBookmark = await fetchBookmark(payload.new.id);
            if (updatedBookmark) dispatch(updateBookmarkRealtime(updatedBookmark));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [dispatch, router]);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
      <Toaster />
    </TooltipProvider>
  );
}