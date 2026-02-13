import { useState, useEffect } from 'react';
import { Bookmark } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { addBookmark, updateBookmark } from '@/lib/BookmarkSlice';

interface BookmarkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editBookmark?: Bookmark | null;
}

export function BookmarkDialog({ open, onOpenChange, editBookmark }: BookmarkDialogProps) {
  const { collections } = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [collectionId, setCollectionId] = useState<string>('none');

  useEffect(() => {
    if (editBookmark) {
      setUrl(editBookmark.url);
      setTitle(editBookmark.title);
      setDescription(editBookmark.description);
      setTags(editBookmark.tags);
      setCollectionId(editBookmark.collectionId || 'none');
    } else {
      setUrl(''); setTitle(''); setDescription(''); setTags([]); setTagInput(''); setCollectionId('none');
    }
  }, [editBookmark, open]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput(''); }
  };

  const handleSubmit = () => {
    if (!url || !title) { toast.error('URL and Title are required'); return; }
    let hostname = "";
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      hostname = parsed.hostname;
    } catch {
      toast.error("Invalid URL");
      return;
    }

    const data = {
      url: url.startsWith("http") ? url : `https://${url}`,
      title,
      description,
      tags,
      collectionId: collectionId === "none" ? null : collectionId,
      favicon: `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`,
      isFavorite: editBookmark?.isFavorite ?? false,
    };
    if (editBookmark) {
      dispatch(updateBookmark({ id: editBookmark.id, updates: data }));
      toast.success('Bookmark updated');
    } else {
      dispatch(addBookmark(data));
      toast.success('Bookmark added');
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editBookmark ? 'Edit Bookmark' : 'Add Bookmark'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="url">URL</Label>
            <Input id="url" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Bookmark title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" placeholder="Short description..." value={description} onChange={e => setDescription(e.target.value)} className="min-h-[60px]" />
          </div>
          <div className="space-y-1.5">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input placeholder="Add tag" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <Button variant="secondary" onClick={addTag} type="button">Add</Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {tags.map(t => (
                  <Badge key={t} variant="secondary" className="gap-1 pr-1">
                    {t}
                    <button onClick={() => setTags(tags.filter(x => x !== t))} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Collection</Label>
            <Select value={collectionId} onValueChange={setCollectionId}>
              <SelectTrigger><SelectValue placeholder="Select collection" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {collections.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{editBookmark ? 'Save Changes' : 'Add Bookmark'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
