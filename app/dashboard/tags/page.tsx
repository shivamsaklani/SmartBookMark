"use client"
import { AppHeader } from '@/components/AppHeader';
import { Tag } from 'lucide-react';
import { useState } from 'react';
import { BookmarkDialog } from '@/components/BookmarkDialog';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';

export default function Tags() {
  const { bookmarks, selectedTag } = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();
  // const navigate = useRouter(); // Navigation disabled as per requirement
  const [dialogOpen, setDialogOpen] = useState(false);

  // Calculate tags manually from bookmarks
  const tagCountsMap = new Map<string, number>();
  bookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      tagCountsMap.set(tag, (tagCountsMap.get(tag) || 0) + 1);
    });
  });

  const tagCounts = Array.from(tagCountsMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  const handleTagClick = (tag: string) => {
    // dispatch(setSelectedTag(tag === selectedTag ? null : tag)); 
    // User requested "do nothing", but maybe selecting for filter is still desired? 
    // "when clicked on tags do nothing it should only show the number of bookmarks"
    // I will strictly follow "do nothing" regarding navigation, maybe just toggle selection for visual feedback if intended, 
    // but the prompt says "do nothing it should only show". I will remove the onClick handler effectively or make it just set state without nav.
    // However, if I just remove onClick, it might be better. 
    // Let's just remove the onClick handler from the button.
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AppHeader onAddBookmark={() => setDialogOpen(true)} />
      <main className="flex-1 p-4 lg:p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Tag className="h-5 w-5" /> Tags
          </h1>
          <p className="text-sm text-muted-foreground">{tagCounts.length} tags</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tagCounts.map(({ tag, count }) => (
            <div
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-accent/50"
            >
              <span>#{tag}</span>
              <span className="text-xs opacity-60 ml-1">{count}</span>
            </div>
          ))}
        </div>
      </main>
      <BookmarkDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
