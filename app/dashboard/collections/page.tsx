"use client"
import { AppHeader } from '@/components/AppHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Trash2, Briefcase, Palette, Code, Newspaper, Zap, GraduationCap, Edit, Plus } from 'lucide-react';
import { useState } from 'react';
import { BookmarkDialog } from '@/components/BookmarkDialog';
import { CollectionDialog } from '@/components/CollectionDialog';
import { DashboardSkeleton } from '@/components/DashboardSkeleton';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { deleteCollection } from '@/lib/BookmarkSlice';
import { Collection } from '@/lib/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase, Palette, Code, Newspaper, Zap, GraduationCap, FolderOpen
};

export default function Collections() {
  const { collections, bookmarks, loading } = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();
  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState(false);
  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);

  const handleEditCollection = (c: Collection) => {
    setEditingCollection(c);
    setCollectionDialogOpen(true);
  };

  const handleAddCollection = () => {
    setEditingCollection(null);
    setCollectionDialogOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AppHeader onAddBookmark={() => setBookmarkDialogOpen(true)} />
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold flex items-center gap-2"><FolderOpen className="h-5 w-5" /> Collections</h1>
            <p className="text-sm text-muted-foreground">{collections.length} collection{collections.length !== 1 ? 's' : ''}</p>
          </div>
          <Button onClick={handleAddCollection} size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Collection
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <DashboardSkeleton />
          ) : collections.map(c => {
            const count = bookmarks.filter(b => b.collectionId === c.id).length;
            const Icon = iconMap[c.icon] || FolderOpen;
            return (
              <Card key={c.id} className="group hover:shadow-md transition-all hover:-translate-y-0.5">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `hsl(${c.color} / 0.15)`, color: `hsl(${c.color})` }}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{c.name}</h3>
                        <p className="text-xs text-muted-foreground">{count} bookmark{count !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEditCollection(c)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => {
                        dispatch(deleteCollection(c.id));
                      }}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <BookmarkDialog open={bookmarkDialogOpen} onOpenChange={setBookmarkDialogOpen} />
      <CollectionDialog open={collectionDialogOpen} onOpenChange={setCollectionDialogOpen} editCollection={editingCollection} />
    </div>
  );
}
