"use client"
import { AppHeader } from '@/components/AppHeader';
import { Tag } from 'lucide-react';
import { allTags } from '@/lib/mock-data';
import { useState } from 'react';
import { BookmarkDialog } from '@/components/BookmarkDialog';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { useRouter } from 'next/navigation';
import { setSelectedTag } from '@/lib/BookmarkSlice';

export default function Tags() {
  const { bookmarks} = useAppSelector((s)=>s.bookmark);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const tagCounts = allTags.map(tag => ({
    tag,
    count: bookmarks.filter(b => b.tags.includes(tag)).length,
  })).sort((a, b) => b.count - a.count);

  const handleTagClick = (tag: string) => {
    dispatch(setSelectedTag(tag));
    navigate.push('/');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AppHeader onAddBookmark={() => setDialogOpen(true)} />
      <main className="flex-1 p-4 lg:p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold flex items-center gap-2"><Tag className="h-5 w-5" /> Tags</h1>
          <p className="text-sm text-muted-foreground">{tagCounts.length} tags</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tagCounts.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <span>#{tag}</span>
              <span className="text-xs opacity-60">{count}</span>
            </button>
          ))}
        </div>
      </main>
      <BookmarkDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
