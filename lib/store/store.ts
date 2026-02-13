import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "../BookmarkSlice";
import AuthReducer from "../Auth";
export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    auth:AuthReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;