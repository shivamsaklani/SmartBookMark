export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description: string;
  // favicon: string;
  tags: string[];
  collectionId: string | null;
  isFavorite: boolean;
  createdAt: string;
  // visits: number;
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type SortOption = 'date' | 'title' | 'visits';
export type ViewMode = 'grid' | 'list';


export interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

export interface AuthSession {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}
