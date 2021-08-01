import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import type {RootState, AppDispatch } from './../redux/redux-store';

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>