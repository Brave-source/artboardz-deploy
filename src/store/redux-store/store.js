import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UIReducer from "./UI-slice";
import collectionReducer from './CollectionSlice';
import collectorReducer from './CollectorSlice';
import merchantReducer from './MerchantSlice';
import adminReducer from "./AdminSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ 
  UI: UIReducer, 
  collection: collectionReducer, 
  admin: adminReducer, 
  collector: collectorReducer,
  merchant: merchantReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);