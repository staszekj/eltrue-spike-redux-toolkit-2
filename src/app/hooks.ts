import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as store from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<store.AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<store.AppRootState> = useSelector;
