import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiServer from "./axios";
interface UserData {
  email: string;
  firstName?:string;//имя
  lastName?:string;//фамилия
  patronymic?:string;//отчество
  gender?: "М"| "Ж";
  birthday?: Date;
  password?: string;
  role?: 'user' | 'admin';
  JWTtokenSelect?:string;
}



export const RegisterUser = createAsyncThunk(
  "/auth/register",
  async ({ email, firstName, lastName, patronymic, gender, birthday, password, role }: UserData) =>{
  try {
    const response = await apiServer.post("/auth/register", {
      firstName, lastName, patronymic, gender, birthday,
      email,
      password,
      role,
    });
    if (response.data instanceof Error) {
      console.error("Ошибка с сервера при регистрации:" + response.data); //    НАДО БУДЕТ ЗАМЕНИТЬ НА РЕАЛЬНЫЙ БЛОК ИНФОРМИРУЮЩИЙ ОБ ОШИБКЕ
    } else {
      console.log("при регистрации ошибок не возникло"+ response)
      LoginUser({ email, password });
    }
    return true; // по идее это не нужно
  } catch (err) {
    console.error("Ошибка регистрации:" + err);
    return err; // или return { error: err.message };
  }
}
)
export const LoginUser = createAsyncThunk(
  "/auth/login",
  async ({ email, password }: UserData) =>{
  // console.log(
  //     email,
  //     password)
  try {
    const response = await apiServer.post("/auth/login", {
      email,
      password,
    });
    if (response.data instanceof Error) {
      console.error("Ошибка с сервера при входе:" + response.data); //    НАДО БУДЕТ ЗАМЕНИТЬ НА РЕАЛЬНЫЙ БЛОК ИНФОРМИРУЮЩИЙ ОБ ОШИБКЕ
    } else {
      console.log(response);
      document.cookie = `JWTtoken=${response.data.JWTtocen}; max-age=${30 * 60};`; //сохраняю JWT в cookie
      document.cookie = `registerIndicator=true; max-age=${30 * 60};`; // созранил данные о авторизации пользователя
      localStorage.setItem("JWTtoken",response.data.JWTtocen)
      
      //составляем пользователя в cookie
      document.cookie = `email=${response.data.user.email}; max-age=${30 * 60};`;
      document.cookie = `firstName=${response.data.user.firstName}; max-age=${30 * 60};`;
      document.cookie = `lastName=${response.data.user.lastName}; max-age=${30 * 60};`;
      document.cookie = `patronymic=${response.data.user.patronymic}; max-age=${30 * 60};`;
      document.cookie = `gender=${response.data.user.gender}; max-age=${30 * 60};`;
      document.cookie = `birthday=${response.data.user.birthday}; max-age=${30 * 60};`;
      document.cookie = `role=${response.data.user.role}; max-age=${30 * 60};`;
    }
    return {user: response.data.user, JWT:response.data.JWTtocen};
  } catch (err) {
    console.error("Ошибка авторизации:" + err);
    return false;
  }
}
)


export const ChangeUser = createAsyncThunk(
  "/auth/user",
  async ({ email, firstName, lastName, patronymic, gender, birthday,  role,JWTtokenSelect }: UserData) =>{
  console.log(
      email, firstName, lastName, patronymic, gender, birthday,  role,JWTtokenSelect)
  try {
    const response = await apiServer.put("/index/user", {
      email, firstName, lastName, patronymic, gender, birthday, role
    },
    {
      headers: {
        Authorization: `Bearer ${JWTtokenSelect}`,
      },
    },
  );
    if (response.data instanceof Error) {
      console.error("Ошибка с сервера при изменении пользователя:" + response.data); 
    } else {
      //составляем пользователя в cookie
      document.cookie = `email=${response.data.email};`;
      document.cookie = `firstName=${response.data.firstName};`;
      document.cookie = `lastName=${response.data.lastName};`;
      document.cookie = `patronymic=${response.data.patronymic};`;
      document.cookie = `gender=${response.data.gender};`;
      document.cookie = `birthday=${response.data.birthday};`;
      document.cookie = `role=${response.data.role};`;
    }
    return response.data;
  } catch (err) {
    console.error("Ошибка изменения пользователя:" + err);
    return false;
  }
}
)



const cookiesObj = Object.fromEntries(
  document.cookie.split("; ").map((c) => c.split("=")),
);
// const value: string = (cookiesObj.JWTtoken===undefined? localStorage.getItem("JWTtoken"):cookiesObj.JWTtoken)
interface UserDataFalse {
  email: string | false;
  firstName?:string | false;//имя
  lastName?:string | false;//фамилия
  patronymic?:string | false;//отчество
  gender?: "М"| "Ж" | false;
  birthday?: Date | false;
  role?: 'user' | 'admin' | false;
}
const UserExample:UserDataFalse={//  по умолчанию вытягиваем двнные из кук при наличии
  email: cookiesObj.email?cookiesObj.email: false,
  firstName: cookiesObj.firstName?cookiesObj.firstName: false,
  lastName: cookiesObj.lastName?cookiesObj.lastName: false,
  patronymic: cookiesObj.patronymic? cookiesObj.patronymic: false,
  gender: cookiesObj.gender?cookiesObj.gender: false,
  birthday: cookiesObj.birthday?cookiesObj.birthday: false,
  role: cookiesObj.role?cookiesObj.role: false,
}
const isAuth:boolean = cookiesObj.registerIndicator?cookiesObj.registerIndicator: false//   определяю отдельно что-бы true из 
// cookiesObj.registerIndicator не выводилось как строка

export const authSlice = createSlice({//  делаем слайс для авторизации-регистрации
    name: 'auth',
    initialState:{
      user:UserExample,//    массив данных о пользователе
      isAuth,//   идентификатор авторизации пользователя
      isLouding:false,//  идёт загрузка
      isError:false,//    индикатор ошибки
      errorMessage:"",
      isJWT:(cookiesObj.JWTtoken===undefined? false : cookiesObj.JWTtoken),//здесь лежит JWT токен
    },
    reducers: {
        // login(state, action) {
        //     state.user = action.payload;//      здесь могут возникать ошибки 
        //     state.isAuth = true
        // },
        // logout(state) {
        //     state.user = []
        //     state.isAuth = false;
        // }
    },
    extraReducers:(builder) => {
      builder
        .addCase(RegisterUser.pending, (state)=>{// начинается обработка регистрации
          state.isLouding = true
          state.isError = false
          state.errorMessage = ""
        })
        .addCase(RegisterUser.fulfilled, (state,action)=>{
          if(action.payload){
            state.isError = false
            state.errorMessage = ""
          }else{
            state.isError = true
            state.errorMessage = "ошибка регистрации"
          }
          state.isLouding = false
          
    console.log("успешная регистрация")
        })
        .addCase(RegisterUser.rejected, (state, action)=>{
          state.isLouding = false
          state.isError = true
          state.errorMessage = "ошибка регистрации"+ action.error.message//нужно проверить работу на action и action.error
        })




        .addCase(LoginUser.pending,(state)=>{// начинается обработка авторизации
          state.isLouding = true
          state.isError = false
          state.errorMessage = ""
          console.log("начало авторизации")
        })
        .addCase(LoginUser.fulfilled, (state, action)=>{
          if(action.payload){//   ts жаловался что action.payload может оказаться false 
            state.user = action.payload.user
            state.isJWT = action.payload.JWT
            state.isError = false
            state.isAuth = true
            
            state.errorMessage = ""
            console.log("успешная авторизация, логин = "+state.isAuth)
          }else{
            state.isAuth = false
            state.isError = true
            state.errorMessage = "ошибка авторизации"
          }
          state.isLouding = false
        })
        .addCase(LoginUser.rejected, (state, action)=>{
          state.isLouding = false
          state.isError = true
          console.log(action)
          console.log(action.error+ "ошибка авторизации")
          state.errorMessage = "ошибка авторизации"+ action.error.message//нужно проверить работу на action и action.error
        })



        .addCase(ChangeUser.pending, (state)=>{//   ИЗМЕНЕНИЕ ПОЛЬЗОВАТЕЛЯ
          state.isLouding = true
          state.isError = false
          state.errorMessage = ""
          console.log("начало изменения пользователя")
        })
        .addCase(ChangeUser.fulfilled, (state, action)=>{
          if(action.payload!=false){//   ts жаловался что action.payload может оказаться false 
            state.user = action.payload
            console.log(action.payload)
          
          state.isError = false
          state.errorMessage = ""
          console.log("успешное изменение пользователя, логин = "+state.isAuth)
          } else{
          console.log("ошибка в изменении пользователя, возвращается: ")
          console.log(action.payload)
          state.isError = true
          state.errorMessage = "ошибка в изменении данных пользователя"
          }
          state.isLouding = false
        })
        .addCase(ChangeUser.rejected, (state, action)=>{
          state.isLouding = false
          state.isError = true
          console.log(action)
          console.log(action.error+ "ошибка авторизации")
          state.errorMessage = "ошибка в изменении данных пользователя"+ action.error.message//нужно проверить работу на action и action.error
        })
    },
});

