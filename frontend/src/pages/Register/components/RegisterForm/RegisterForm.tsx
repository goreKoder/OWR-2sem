import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react"; //ссылочки на HTML элементы
// import { RegisterUser } from "../../../../api/authService"; //не смог установить алиасы 
import {useForm} from "react-hook-form";
import styles from "../../Register.module.scss";
import { useAppDispatch,useAppSelector } from "../../../../app/store";
import { LoginUser, RegisterUser } from "../../../../api/authService";
// import { AuthorizationIndicatorContext } from "../../../../components/context/authorizationIndicator";
export default function RegisterForm() {
  
  interface Input{
    emailForm: string
    firstNameForm:string
    lastNameForm:string
    patronymicForm:string
    genderForm:'М'|'Ж'
    birthdayForm:Date
    passwordForm:string
    roleForm:'user' | 'admin'
  }
  const {register, handleSubmit, formState:{errors}} = useForm<Input>({defaultValues:{
    emailForm: "",
    firstNameForm:"",
    lastNameForm:"",
    patronymicForm:"",
    // genderForm:"М",
    // birthdayForm:"",
    passwordForm:"",
    roleForm:'user'
  }})

  const navigate = useNavigate();

  const dispatch = useAppDispatch();//  выгружаем thunk для изменений значений
  const Indicator = useAppSelector(state => state.auth.isAuth)

  useEffect(()=>{
    if(Indicator){// если запрос авторизации прошёл успешно переходим на страницу событий
      navigate("/events");
    }
  },[Indicator])

  // let errorIndicator: boolean = false// если ошибка регистрации то становится true и выводится окно с ошибкой
  // const [errorText, setErrorText] = useState("")
  return (
    <main className={styles.main}>
      <div className={styles.contaner}>

      <div>{useAppSelector(state => state.auth.isError)}</div>{/* блок с ошибкой  */}

        <div className="TimeSpark">
          {/* <img src="" alt="" /> */}
          <h1 className={styles.h1}>TimeSpark</h1>
        </div>
        <div className="new_account">
          <h2 className={styles.h2}>Новый аккаунт</h2>
          {/* <img src="" alt="" /> */}
        </div>
        {/* <div> */}
        <form 
          onSubmit = {handleSubmit((Data:Input) => {
            // event.preventDefault(); //предотвращает перезагрузку страници
              const firstName = Data.firstNameForm;
              const lastName = Data.lastNameForm;
              const patronymic = Data.patronymicForm;
              const gender = Data.genderForm;
              const birthday = Data.birthdayForm;
              const password = Data.passwordForm;
              const email = Data.emailForm;
              const role = Data.roleForm;
              
              const LoginAsync = async () => {
                const IndicatorRegister = await dispatch(RegisterUser({//    отправляю запрос на регистрацию
                  email,
                  firstName, lastName, patronymic, gender, birthday,
                  password,
                  role,
                }))
                if (IndicatorRegister){// авторизация в случае успешной регистрации (можно использовать useAppSelector(state => state.auth.isError)
                  await dispatch(LoginUser({//    отправляю запрос на авторизацию
                  email,
                  password,
                  }))
                  
                }
              };
              LoginAsync();
            
          })}
          className={styles.form}
        >
          <div>
            <input {...register("emailForm",{required: "обязательное поле email",pattern:{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный email"
            }})} placeholder="email" className={styles.input} type="email" 
  id="hidden-email"/>
            <p>{errors.emailForm?.message}</p>
          </div>



          <div>
            <input {...register("firstNameForm",{required: "обязательное поле имя"})} placeholder={"имя"} className={styles.input} type="text" />
            <p>{errors.firstNameForm?.message}</p>
          </div>
          <div>
            <input {...register("lastNameForm",{required: "обязательное поле фамилия"})} placeholder={"фамилия"} className={styles.input} type="text" />
            <p>{errors.lastNameForm?.message}</p>
          </div>
          <div>
            <input {...register("patronymicForm")} placeholder={"отчество"} className={styles.input} type="text" />
            <p>{errors.patronymicForm?.message}</p>
          </div>
          <div>
            <input {...register("genderForm",{required: "обязательное поле name"})} placeholder={"пол"} className={styles.input} type="text" />
            <p>{errors.genderForm?.message}</p>
          </div>
          <div>
            <input {...register("birthdayForm",{required: "обязательное поле name"})} placeholder={"день рождения"} className={styles.input} type="date" />
            <p>{errors.birthdayForm?.message}</p>
          </div>


          <div>
            <input {...register("roleForm",{required: "обязательное поле role"})} placeholder={"role"} className={styles.input} type="text" />
            <p>{errors.roleForm?.message}</p>
          </div>
          <div>
            <input {...register("passwordForm",{required: "обязательное поле password"})} placeholder={"password"} className={styles.input} type="password" />
            <p>{errors.passwordForm?.message}</p>
          </div>
          {/* <input type="text" /> */}
          <button type="submit" className={styles.button}>
            Создать аккаунт
          </button>
          <p className={styles.p}>Уже зарегестрированы?</p>
          <Link to="/login" className={styles.a}>
            Войти в аккаунт
          </Link>
        </form>
        {/* </div> */}
      </div>
    </main>
  );
}
