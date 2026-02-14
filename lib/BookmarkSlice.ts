import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Bookmark, Collection, SortOption, ViewMode } from "@/lib/types";
import axios from "axios";

interface BookmarkState {
  bookmarks: Bookmark[];
  collections: Collection[];
  searchQuery: string;
  sortOption: SortOption;
  viewMode: ViewMode;
  selectedTag: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  bookmarks: [],
  collections: [],
  searchQuery: "",
  sortOption: "date",
  viewMode: "grid",
  selectedTag: null,
  loading: false,
  error: null,
};

// Async Thunks

export const fetchBookmarks = createAsyncThunk(
  "bookmark/fetchBookmarks",
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}Bookmarks`);
    return response.data;
  }
);

export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async (bookmark: Omit<Bookmark, "id" | "createdAt" | "visits">) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}Bookmarks`, bookmark);
    return response.data;
  }
);

export const updateBookmark = createAsyncThunk(
  "bookmark/updateBookmark",
  async ({ id, updates }: { id: string; updates: Partial<Bookmark> }) => {
    // Optimistic update handled in extraReducers if needed, but here we wait for server
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}Bookmarks/${id}`, updates);
    return response.data;
  }
);

export const deleteBookmark = createAsyncThunk(
  "bookmark/deleteBookmark",
  async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}Bookmarks/${id}`);
    return id;
  }
);

export const toggleFavorite = createAsyncThunk(
  "bookmark/toggleFavorite",
  async (id: string, { getState }) => {
    const state = getState() as { bookmark: BookmarkState };
    const bookmark = state.bookmark.bookmarks.find((b) => b.id === id);
    if (!bookmark) throw new Error("Bookmark not found");

    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}Bookmarks/${id}`, {
      isFavorite: !bookmark.isFavorite,
    });
    return response.data;
  }
);

export const fetchCollections = createAsyncThunk(
  "bookmark/fetchCollections",
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}collections`);
    return response.data;
  }
);

export const addCollection = createAsyncThunk(
  "bookmark/addCollection",
  async (collection: Omit<Collection, "id">) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}collections`, collection);
    return response.data;
  }
);

export const updateCollection = createAsyncThunk(
  "bookmark/updateCollection",
  async ({ id, updates }: { id: string; updates: Partial<Collection> }) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}collections/${id}`, updates);
    return response.data;
  }
);

export const deleteCollection = createAsyncThunk(
  "bookmark/deleteCollection",
  async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}collections/${id}`);
    return id;
  }
);

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
    // Realtime Reducers
    addBookmarkRealtime: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks.unshift(action.payload);
    },
    updateBookmarkRealtime: (state, action: PayloadAction<Bookmark>) => {
      const index = state.bookmarks.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bookmarks[index] = action.payload;
      }
    },
    deleteBookmarkRealtime: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Bookmarks
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bookmarks";
      })
      // Add Bookmark
      .addCase(addBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks.unshift(action.payload);
      })
      .addCase(addBookmark.rejected, (state) => {
        state.loading = false;
      })
      // Update Bookmark & Toggle Favorite
      .addCase(updateBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookmark.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookmarks.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.bookmarks[index] = action.payload;
        }
      })
      .addCase(updateBookmark.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const index = state.bookmarks.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.bookmarks[index] = action.payload;
        }
      })
      // Delete Bookmark
      .addCase(deleteBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = state.bookmarks.filter((b) => b.id !== action.payload);
      })
      .addCase(deleteBookmark.rejected, (state) => {
        state.loading = false;
      })
      // Fetch Collections
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state) => {
        state.loading = false;
      })
      // Add Collection
      .addCase(addCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.collections.push(action.payload);
      })
      .addCase(addCollection.rejected, (state) => {
        state.loading = false;
      })
      // Delete Collection
      .addCase(deleteCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = state.collections.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteCollection.rejected, (state) => {
        state.loading = false;
      })
      // Update Collection
      .addCase(updateCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.collections.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.collections[index] = action.payload;
        }
      })
      .addCase(updateCollection.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSearchQuery,
  setSortOption,
  setViewMode,
  setSelectedTag,
  addBookmarkRealtime,
  updateBookmarkRealtime,
  deleteBookmarkRealtime,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;