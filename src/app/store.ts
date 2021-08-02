import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import counter2Reducer from "app/features/counter2/counter2Slice"
import booksReducer from 'app/features/books/books.slice';
import * as reduxLogger from "redux-logger";
import * as paletteSlice from './models/paletteSlice'
import simpleApiCallerSliceReducer from './features/simple-api-caller/simple-api-caller-slice'

const logger = reduxLogger.createLogger({ collapsed: () => true });


export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    counter: counterReducer,
    counter2: counter2Reducer,
    books: booksReducer,
    palette: paletteSlice.reducer,
    simpleApiCaller: simpleApiCallerSliceReducer
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  Action<string>
>;

export type AppGetState = () => AppRootState;
export type AppThunkApiConfig = {
  state: AppRootState;
  dispatch: AppDispatch;
}