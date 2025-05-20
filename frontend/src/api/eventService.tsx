import { AxiosResponse } from "axios";
import apiServer from "./axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {useAppSelector}from "../app/store"
import { authSlice } from "./authService";

interface Ievent {//  интерфейс массива событий
  createdby?: number;
  date?: Date;
  description?: string;
  enddate?: Date;
  id?: number;
  startdate?: Date;
  title?: string;
  JWTtokenSelect?:string;
}

//  взаимодействие с куками
// const cookiesObj = Object.fromEntries(
//   document.cookie.split("; ").map((c) => c.split("=")),
// );
// const value: string = (cookiesObj.JWTtoken===undefined? localStorage.getItem("JWTtoken"):cookiesObj.JWTtoken)

export const getEvents = createAsyncThunk(
  "/event/getEvents",async (JWTtokenSelect:string)=> {
  try {
    // const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)//  кастомным хуком вытаскиваю состояние

    const response:AxiosResponse<Ievent[]> = await apiServer.get<Ievent[]>(//    ВОЗМОЖНО ИЗ-ЗА :Ievent[] ВСЁ СЛОМАЕТСЯ
      "/index/events",
      {
        //извлечение всех ивентов
        headers: {
          Authorization: `Bearer ${JWTtokenSelect}`,
        },
      },
    );
    // console.log("Конец выгрузки ивентов" + response);
    return response; 
  } catch (err) {
    console.log("ошибка выгрузки событий" + err );
  }
}
)

export const postEvents = createAsyncThunk(
  "/event/postEvents",
  async ({ title, description, date, JWTtokenSelect }: Ievent) => {
  //     добавление события
  try {
    // const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)//  кастомным хуком вытаскиваю состояние

    const response = await apiServer.post(
      "/index/events",
      {
        title,
        description,
        date,
        startdate: date,
        enddate: date,
      },
      {
        headers: {
          Authorization: `Bearer ${String(JWTtokenSelect)}`,
        },
      },
    );
    return true; 
  } catch (err) {
    console.log("ошибка создания события" + err);
  }
}
)

export const putEvents = createAsyncThunk(
  "/event/putEvents",
  async ({ title, description, date, id,JWTtokenSelect }: Ievent) => {
  try {
    // const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)//  кастомным хуком вытаскиваю состояние

    const response = await apiServer.put(
      "/index/events/" + id, //изменение ивента
      {
        title,
        description,
        date,
        startdate: date,
        enddate: date,
      },
      {
        headers: {
          Authorization: `Bearer ${JWTtokenSelect}`,
        },
        params: {
          id,
        },
      },
    );
    return true; 
  } catch (err) {
    console.log("ошибка изменения события" + err);
  }
}
)

export const deleteEvents = createAsyncThunk(
  "/event/deleteEvents",
  async ({ id,JWTtokenSelect }: Ievent) => {
  try {
    // const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)//  кастомным хуком вытаскиваю состояние

    const response =
      await apiServer.delete(
        "/index/events/" + id, //удаление ивента
        {
          headers: {
            Authorization: `Bearer ${JWTtokenSelect}`,
          },
          params: {
            id,
          },
        },
      );
    return true; 
  } catch (err) {
    console.log("ошибка удаления события" + err);
  }
}
)

export const getSelectEvents = createAsyncThunk(
  "/event/getSelect",
  async ({startdate, enddate,JWTtokenSelect}:Ievent) => {
  try {
    // const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)//  кастомным хуком вытаскиваю состояние

    const response:AxiosResponse<Ievent[]> = await apiServer.get<Ievent[]>(//    ВОЗМОЖНО ИЗ-ЗА :Ievent[] ВСЁ СЛОМАЕТСЯ
      "/public/events",
      {
        //извлечение всех ивентов
        headers: {
          Authorization: `Bearer ${JWTtokenSelect}`,
        },
        params: {
          startdate ,
          enddate
        },
      },
    );
    return response; 
  } catch (err) {
    console.log("ошибка выгрузки событий" + err);
  }
}
)



interface InitialState{
  arrEvent:AxiosResponse<Ievent[]>|false//по идее должно быть Ievent
  isLouding:boolean
  isError:boolean
  errorMessage:string
}
let initialState:InitialState ={
      arrEvent: false,//   МАССИВ СОБЫТИЙ
      isLouding:false,//  идёт загрузка
      isError:false,//    индикатор ошибки
      errorMessage:"",
    }

export const eventSlice = createSlice({//  делаем слайс для авторизации-регистрации
    name: 'event',
    initialState,
    reducers: {
        // setEvents(state, action) {
        //     state.arrEvent = action.payload;
        // },
        // resetEvents(state) {
        //     state.arrEvent = false;
        // }
    },
    extraReducers:(builder) => {
        builder
          .addCase(getEvents.pending, (state)=>{//  ВЫГРУЗКА СОБЫТИЙ ПОЛЬЗОВАТЕЛЯ
            console.log("Начало вытаскивания массива")
            state.isLouding = true
            state.isError = false
            state.errorMessage = ""
          })
          .addCase(getEvents.fulfilled, (state, action)=>{
            console.log("Конец вытаскивания массива")
            state.isLouding = false
            
            if(action.payload) {
              state.arrEvent = action.payload//  загружаем события в state
              state.isError = false
              state.errorMessage = ""
            }else{
              state.isError = true
              state.errorMessage = "Ошибка при выгрузке событий"
            }
          })
          .addCase(getEvents.rejected, (state,action)=>{
            console.log("Не получилось вытащить массив")
            state.isLouding = false
            state.isError = true
            state.errorMessage = "ошибка при выгрузке событий"+action.error.message
          })



          .addCase(postEvents.pending, (state)=>{//  ДОБАВЛЕНИЕ СОБЫТИЯ ПОЛЬЗОВАТЕЛЯ
            console.log("Начало создания события")
            state.isLouding = true
            state.isError = false
            state.errorMessage = ""
          })
          .addCase(postEvents.fulfilled, (state, action)=>{
            console.log("Конец создания события")
            state.isLouding = false
            if(action.payload) {
              state.isError = false
              state.errorMessage = ""
            }else{
              state.isError = true
              state.errorMessage = "Ошибка при добавлении события"
            }
          })
          .addCase(postEvents.rejected, (state,action)=>{
            console.log("Ошибка создания события")
            state.isLouding = false
            state.isError = true
            state.errorMessage = "ошибка при создании события"+action.error.message
          })



          .addCase(putEvents.pending, (state)=>{//  ОБНОВЛЕНИЕ СОБЫТИЯ ПОЛЬЗОВАТЕЛЯ
            state.isLouding = true
            state.isError = false
            state.errorMessage = ""
          })
          .addCase(putEvents.fulfilled, (state, action)=>{
            state.isLouding = false
            if(action.payload) {
              state.isError = false
              state.errorMessage = ""
            }else{
              state.isError = true
              state.errorMessage = "Ошибка при изменении события"
            }
          })
          .addCase(putEvents.rejected, (state,action)=>{
            state.isLouding = false
            state.isError = true
            state.errorMessage = "ошибка при изменении события"+action.error.message
          })



          .addCase(deleteEvents.pending, (state)=>{//  УДАЛЕНИЕ СОБЫТИЯ ПОЛЬЗОВАТЕЛЯ
            state.isLouding = true
            state.isError = false
            state.errorMessage = ""
          })
          .addCase(deleteEvents.fulfilled, (state, action)=>{
            state.isLouding = false
            if(action.payload) {
              state.isError = false
              state.errorMessage = ""
            }else{
              state.isError = true
              state.errorMessage = "Ошибка при удалении события"
            }
          })
          .addCase(deleteEvents.rejected, (state,action)=>{
            state.isLouding = false
            state.isError = true
            state.errorMessage = "ошибка при удалении события"+action.error.message
          })



          .addCase(getSelectEvents.pending, (state)=>{//  ВЫГРУЗКА СОБЫТИЙ ПОЛЬЗОВАТЕЛЯ ПО ДИОПАЗОНУ ДАТ
            state.isLouding = true
            state.isError = false
            state.errorMessage = ""
          })
          .addCase(getSelectEvents.fulfilled, (state, action)=>{
            state.isLouding = false
            if(action.payload) {
              state.arrEvent = action.payload//  загружаем события в state
              state.isError = false
              state.errorMessage = ""
            }else{
              state.isError = true
              state.errorMessage = "Ошибка при добавлении события"
            }
          })
          .addCase(getSelectEvents.rejected, (state,action)=>{
            state.isLouding = false
            state.isError = true
            state.errorMessage = "ошибка при выгрузке событий по датам"+action.error.message
          })
    },
});


