"use client"
import { BookmarkCard } from '@/components/BookmarkCard';
import { BookmarkDialog } from '@/components/BookmarkDialog';
import { AppHeader } from '@/components/AppHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bookmark as BookmarkIcon } from 'lucide-react';
import { Bookmark, SortOption } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { setSelectedTag, setSortOption } from '@/lib/BookmarkSlice';
import { useRouter } from 'next/navigation';

export default function Dashboard() {

  const { bookmarks, searchQuery, sortOption, viewMode, selectedTag } = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const { user } = useAppSelector((state) => state.auth);
      useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  if (!user) return null;
  const filtered = useMemo(() => {
    let result = bookmarks;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((b: { title: string; url: string; tags: any[]; }) =>
        b.title.toLowerCase().includes(q) ||
        b.url.toLowerCase().includes(q) ||
        b.tags.some((t: string | any[]) => t.includes(q))
      );
    }
    if (selectedTag) result = result.filter((b: { tags: string | any[]; }) => b.tags.includes(selectedTag));
    result = [...result].sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      return b.createdAt.localeCompare(a.createdAt);
    });
    return result;
  }, [bookmarks, searchQuery, sortOption, selectedTag]);

  const handleEdit = (b: Bookmark) => { setEditingBookmark(b); setDialogOpen(true); };
  const handleAdd = () => { setEditingBookmark(null); setDialogOpen(true); };
  return (<>
    <div className="flex-1 flex flex-col min-h-screen">
      <AppHeader onAddBookmark={handleAdd} />
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">All Bookmarks</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} bookmark{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            {selectedTag && (
              <button onClick={() => dispatch(setSelectedTag(null))} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors">
                #{selectedTag} ✕
              </button>
            )}
            <Select value={sortOption} onValueChange={v => dispatch(setSortOption(v as SortOption))}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookmarkIcon className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="font-medium text-muted-foreground">No bookmarks found</h3>
            <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search or add a new bookmark.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b: Bookmark) => <BookmarkCard key={b.id} bookmark={b} onEdit={handleEdit} />)}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((b: Bookmark) => <BookmarkCard key={b.id} bookmark={b} onEdit={handleEdit} />)}
          </div>
        )}
      </main>
      <BookmarkDialog open={dialogOpen} onOpenChange={setDialogOpen} editBookmark={editingBookmark} />
    </div>
  </>
  );
}
