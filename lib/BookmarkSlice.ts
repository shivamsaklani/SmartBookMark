import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bookmark, Collection, SortOption, ViewMode } from "@/lib/types";
import { bookmarks as initialBookmarks, collections as initialCollections } from "@/lib/mock-data";

interface BookmarkState {
  bookmarks: Bookmark[];
  collections: Collection[];
  searchQuery: string;
  sortOption: SortOption;
  viewMode: ViewMode;
  selectedTag: string | null;
}

const initialState: BookmarkState = {
  bookmarks: initialBookmarks,
  collections: initialCollections,
  searchQuery: "",
  sortOption: "date",
  viewMode: "grid",
  selectedTag: null,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },

    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },

    setSelectedTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },

    addBookmark: (
      state,
      action: PayloadAction<Omit<Bookmark, "id" | "createdAt" | "visits">>
    ) => {
      state.bookmarks.unshift({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        visits: 0,
      });
    },

    updateBookmark: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Bookmark> }>
    ) => {
      const { id, updates } = action.payload;
      const bookmark = state.bookmarks.find((b) => b.id === id);
      if (bookmark) Object.assign(bookmark, updates);
    },

    deleteBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter((b) => b.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const bookmark = state.bookmarks.find((b) => b.id === action.payload);
      if (bookmark) bookmark.isFavorite = !bookmark.isFavorite;
    },

    addCollection: (
      state,
      action: PayloadAction<Omit<Collection, "id">>
    ) => {
      state.collections.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },

    deleteCollection: (state, action: PayloadAction<string>) => {
      state.collections = state.collections.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

export const {
  setSearchQuery,
  setSortOption,
  setViewMode,
  setSelectedTag,
  addBookmark,
  updateBookmark,
  deleteBookmark,
  toggleFavorite,
  addCollection,
  deleteCollection,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;