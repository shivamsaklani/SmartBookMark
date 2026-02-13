import { Search, Plus, LayoutGrid, List} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { setSearchQuery, setViewMode } from '@/lib/BookmarkSlice';
import { Input } from './ui/input';

interface AppHeaderProps {
  onAddBookmark: () => void;
}

export function AppHeader({ onAddBookmark }: AppHeaderProps) {
  const { searchQuery, viewMode} = useAppSelector((state)=>state.bookmark);
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4">
      <SidebarProvider>
      <SidebarTrigger className="lg:hidden" /></SidebarProvider>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search bookmarks..."
          value={searchQuery}
          onChange={e => dispatch(setSearchQuery(e.target.value))}
          className="pl-9 h-9 bg-secondary border-0"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:flex items-center border rounded-lg p-0.5 bg-secondary">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => dispatch(setViewMode('grid'))}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => dispatch(setViewMode('list'))}
          >
            <List className="h-3.5 w-3.5" />
          </Button>
        </div>
        <Button size="sm" onClick={onAddBookmark} className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Bookmark</span>
        </Button>
      </div>
    </header>
  );
}
