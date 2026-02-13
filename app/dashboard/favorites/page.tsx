"use client"
import { useState, useMemo } from 'react';
import { BookmarkCard } from '@/components/BookmarkCard';
import { BookmarkDialog } from '@/components/BookmarkDialog';
import { AppHeader } from '@/components/AppHeader';
import { Heart } from 'lucide-react';
import { Bookmark } from '@/lib/types';
import { useAppSelector } from '@/hooks/use-redux';

export default function Favorites() {
  const { bookmarks, searchQuery } = useAppSelector((s)=>s.bookmark);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  const favorites = useMemo(() => {
    let result = bookmarks.filter(b => b.isFavorite);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q));
    }
    return result;
  }, [bookmarks, searchQuery]);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AppHeader onAddBookmark={() => { setEditingBookmark(null); setDialogOpen(true); }} />
      <main className="flex-1 p-4 lg:p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold flex items-center gap-2"><Heart className="h-5 w-5 text-red-500" /> Favorites</h1>
          <p className="text-sm text-muted-foreground">{favorites.length} bookmark{favorites.length !== 1 ? 's' : ''}</p>
        </div>
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="font-medium text-muted-foreground">No favorites yet</h3>
            <p className="text-sm text-muted-foreground/70 mt-1">Click the heart icon on any bookmark to add it to favorites.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map(b => <BookmarkCard key={b.id} bookmark={b} onEdit={(bm) => { setEditingBookmark(bm); setDialogOpen(true); }} />)}
          </div>
        )}
      </main>
      <BookmarkDialog open={dialogOpen} onOpenChange={setDialogOpen} editBookmark={editingBookmark} />
    </div>
  );
}
