import { createContext, useState } from "react";//    ВСЕ ИЗМЕНЕНИЯ СОСТОЯНИЙ КОНТЕКСТА ПРОХОДЯТ В ./api

//    использование контекста

interface ComponentReact{
    children: React.ReactNode;
}
interface AuthContextType {
    IndicatorState: boolean;
    setIndicatorState:React.Dispatch<React.SetStateAction<boolean>>;

    JWTstring: string;
    setJWTstring: React.Dispatch<React.SetStateAction<string>>;

    ChangeEventState:boolean;
    setChangeEventState:React.Dispatch<React.SetStateAction<boolean>>;

    CreatEventState: boolean;
    setCreatEventState:React.Dispatch<React.SetStateAction<boolean>>;

    DeleteEventState:boolean;
    setDeleteEventState:React.Dispatch<React.SetStateAction<boolean>>;
}

const cookiesObj = Object.fromEntries(//ПРОВЕРЯЕМ ЕСТЬ ЛИ АВТОРИЗАЦИЯ В КУКАХ
    document.cookie.split("; ").map((c) => c.split("=")),
);
console.log((cookiesObj.registerIndicator==="true")+ cookiesObj.registerIndicator+ " самый первый индикатор")

export const AuthorizationIndicatorContext = createContext<AuthContextType>({
    IndicatorState: (cookiesObj.registerIndicator==="true" ? true: false),
    setIndicatorState: () => {}, // Пустая функция
    JWTstring: (cookiesObj.JWTtoken===undefined ? "": cookiesObj.JWTtoken),
    setJWTstring: ()=>{},
    ChangeEventState:false,
    setChangeEventState: ()=>{},
    CreatEventState: false,
    setCreatEventState: () => {}, // Пустая функция
    DeleteEventState:false,
    setDeleteEventState: ()=>{},
});

export function AuthorizationIndicatorProvider({children}:ComponentReact){
    const [IndicatorState, setIndicatorState] = useState<boolean>((cookiesObj.registerIndicator==="true" ? true: false));//   идентификатор авторизации пользователя
    
    const [JWTstring, setJWTstring ]= useState<string>("");

    const [ChangeEventState, setChangeEventState] = useState<boolean>(false);//  индикатор изменения события
    const [CreatEventState, setCreatEventState] = useState<boolean>(false);//   индикатор создания события
    const [DeleteEventState, setDeleteEventState] = useState<boolean>(false);//   индикатор удаления события
    // setIndicatorState(authorizationIndicator)
    return(
        <AuthorizationIndicatorContext.Provider value={{IndicatorState, setIndicatorState, 
            JWTstring, setJWTstring,

        ChangeEventState, setChangeEventState, 
        CreatEventState, setCreatEventState,
        DeleteEventState,setDeleteEventState}}>
        {children}
        </AuthorizationIndicatorContext.Provider>
    )
}

//   Тип "{ IndicatorState: boolean; setIndicatorState: React.Dispatch<React.SetStateAction<boolean>>; }" не может быть назначен для типа "boolean".