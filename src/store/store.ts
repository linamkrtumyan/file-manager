import { folderAPI } from "./../services/FolderService";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fileAPI } from "../services/FileService";

const rootReducer = combineReducers({
  [folderAPI.reducerPath]: folderAPI.reducer,
  [fileAPI.reducerPath]: fileAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(folderAPI.middleware)
        .concat(fileAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
