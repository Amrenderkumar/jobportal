import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer} from "./authslice.js"
import jobSlice from "./jobSlice";
import companyReducer from "./companyslice.js"

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
import { companySlice } from "./companyslice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobSlice,

  company: companySlice,
  company: companyReducer,
//   application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
 reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

    // reducer: {
    //    auth: authReducer,
    //    job: jobSlice
    // }
})

export default store;