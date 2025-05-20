import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {authSlice} from "../api/authService"//  импортируем слайсы
import { eventSlice } from "../api/eventService";




export const store = configureStore({// создали хранилище
    reducer: {
        event: eventSlice.reducer,
        auth: authSlice.reducer
    },
    devTools: true
});

//  создаём типы чтобы потом сделать касттомные хуки и не пришлось в коде при вызове useDispatch, useSelector указывать тип
type RootState = ReturnType<typeof store.getState>//       по идее ReturnType лишний
type AppDispatch = typeof store.dispatch

export const useAppDispatch: ()=> AppDispatch = useDispatch//   типизируем хук, можно записать как = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector