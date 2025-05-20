// import { Link } from 'react-router-dom'
import styles from "../../Login.module.scss";
// import {  useContext, useState } from "react";
import {useForm }from "react-hook-form"
import { LoginUser } from "../../../../api/authService";//  функция авторизации
import { useNavigate } from "react-router-dom";

// import {AuthorizationIndicatorContext} from "../../../../components/context/authorizationIndicator"
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { useEffect } from "react";

export default function RegisterForm() {

  type Inputs = {//   настраиваю тнтерфейс для вывода ошибок на странице
    emailForm: string,
    passwordForm: string,
  }
  const {register, handleSubmit, formState:{errors}} = useForm<Inputs>({
    defaultValues:{
      emailForm: "",
      passwordForm: "",
    }
  })

  // const {setIndicatorState} = useContext(AuthorizationIndicatorContext)

  const navigate = useNavigate(); //  неработает внутри асинхронных функций

  const dispatch = useAppDispatch();//  выгружаем thunk для изменений значений
  const error = useAppSelector(state => state.auth.isError)
  const auth = useAppSelector(state => state.auth.isAuth)

  useEffect(()=>{
    if(auth){// если запрос авторизации прошёл успешно переходим на страницу событий
                  navigate("/events");
                }
  },[auth])
    // let errorIndicator: boolean = false// если ошибка регистрации то становится true и выводится окно с ошибкой
    // const [errorText, setErrorText] = useState("")
  return (
    <main className={styles.main}>
      <div className={styles.contaner}>
        {/* <div>{errorText}</div> */}
        <div>{useAppSelector(state => state.auth.isError)}</div>{/* блок с ошибкой  */}
        <div className="TimeSpark">
          {/* <img className={styles.img} src="" alt="" /> */}
          <h1 className={styles.h1}>TimeSpark</h1>
        </div>
        <div className="new_account">
          <h2>войти в аккаунт</h2>
          {/* <img src="" alt="" /> */}
        </div>
        <form
          onSubmit={handleSubmit((Data:Inputs) => {
              const password =  Data.passwordForm;
              const email = Data.emailForm;
              const LoginAsync = async () => {
                const IndicatorRegister = await dispatch(LoginUser({//    отправляю запрос на регистрацию
                  email,
                  password,
                }))
                console.log("error в Login = "+error)
                console.log("пароль: "+password)
                
              }
          LoginAsync();
          })}
          className={styles.form}
        >
          <div>
            <input {...register("emailForm",{required: "Обязательное поле email",pattern:{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный email"
            }})} placeholder="Почта" className={styles.input} type="email" />
            <p>{errors.emailForm?.message}</p>
          </div>
          
          <div>
            <input {...register("passwordForm",{required: "Обязательное поле пароль"})}  placeholder="Пароль" className={styles.input} type="password" />
            <p>{errors.passwordForm?.message}</p>
          </div>
          {/* <input type="text" /> */}
          <button type="submit" className={styles.button}>
            Войти
          </button>
          {/* <p>Уже зарегестрированы?</p> */}
          {/* <p>Не повезло</p> */}
          {/* <Link to='/'>Войти в аккаунт</Link> */}
        </form>
      </div>
    </main>
  );
}
