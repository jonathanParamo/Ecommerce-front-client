// import { configureStore } from '@reduxjs/toolkit';
// import productsReducer from './features/products/productsProviders';
// import cartReducer from './features/cart/cartProvider';

// export const makeStore = (preloadedState) =>
//   configureStore({
//     reducer: {
//       products: productsReducer,
//       cart: cartReducer,
//     },
//     preloadedState,
//   });


// export const initializeStore = (preloadedState) => {
//   const _store = makeStore(preloadedState);

//   if (preloadedState && typeof window === 'undefined') {
//     return makeStore({
//       ..._store.getState(),
//       ...preloadedState,
//     });
//   }

//   return _store;
// };

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './features/products/productsProviders';
import cartReducer from './features/cart/cartProvider';
import categoriesProviders from './features/cateogory/categoriesProviders';
import userProviders from './features/user/userProviders';

// Configuración de persistencia
const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart', 'user', 'categories', 'products']
};

// Combinación de reducers
const rootReducer = {
  products: productsReducer,
  cart: cartReducer,
  categories: categoriesProviders,
  user: userProviders,
};

// Aplicación del persistReducer.
//esto no iba genera otro error: (state = {}, action) => {
  // switch (action.type) {
  //   default:
  //     return state;
  // }
// });
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

// export const makeStore = () =>
//   configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     })
//   });

// export const initializeStore = (preloadedState) => {
//   const _store = makeStore(preloadedState);

//   if (preloadedState && typeof window === 'undefined') {
//     return makeStore({
//       ..._store.getState(),
//       ...preloadedState,
//     });
//   }

//   return _store;
// };

// export const store = makeStore();
// export const persistor = persistStore(makeStore());


export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

