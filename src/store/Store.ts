import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./feature/counter/CounterSlice";
import cartReducer from "./feature/cart/CartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define ThunkMiddleware type

export const store = configureStore({
  reducer: persistedReducer,
  
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
