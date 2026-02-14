import { ExternalLink, MoreVertical, Trash2, Edit, Star, Globe, Heart, Copy, EditIcon, BookMarked } from 'lucide-react';
import { Bookmark } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

import { useAppDispatch } from '@/hooks/use-redux';
import { toggleFavorite, deleteBookmark } from '@/lib/BookmarkSlice';
import { formatDate } from '@/lib/utils';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (b: Bookmark) => void;
}

export function BookmarkCard({ bookmark, onEdit }: BookmarkCardProps) {
  const dispatch = useAppDispatch();

  const copyLink = () => {
    navigator.clipboard.writeText(bookmark.url);
    toast.success('Link copied to clipboard');
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
            <BookMarked className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
            >
              {bookmark.title}
            </a>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{bookmark.url}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{bookmark.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {bookmark.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <span className="text-[11px] text-muted-foreground">{formatDate(bookmark.createdAt)}</span>
          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => dispatch(toggleFavorite(bookmark.id))}>
              <Heart className={`h-3.5 w-3.5 ${bookmark.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyLink}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(bookmark)}>
              <EditIcon className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => {
              dispatch(deleteBookmark(bookmark.id));
              toast.success('Bookmark deleted');
            }}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
