import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react"; //ссылочки на HTML элементы
import { RegisterUser } from "../../../../api/authService"; //не смог установить алиасы
import {useForm} from "react-hook-form";
import styles from "../../Register.module.scss";
import { AuthorizationIndicatorContext } from "../../../../components/context/authorizationIndicator";
export default function RegisterForm() {
  
  interface Input{
    emailForm: string,
    nameForm:string,
    passwordForm:string,
    roleForm:'user' | 'admin'
  }
  const {register, handleSubmit, formState:{errors}} = useForm<Input>({defaultValues:{
    emailForm: "",
    nameForm:"",
    passwordForm:"",
    roleForm:'user'
  }})

  const navigate = useNavigate();

  const {setIndicatorState} = useContext(AuthorizationIndicatorContext)

  return (
    <main className={styles.main}>
      <div className={styles.contaner}>
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
              const name = Data.nameForm;
              const password = Data.passwordForm;
              const email = Data.emailForm;
              const role = Data.roleForm;
              const LoginAsync = async () => {
                const boolIndikat = await RegisterUser({//    отправляю запрос на регистрацию
                  email,
                  name,
                  password,
                  role,
                });
                console.log(boolIndikat);
                if (boolIndikat == true) {
                  console.log(boolIndikat);
                  setIndicatorState(true);//  индикатор авторизации должен стать true
                  navigate("/events");
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
            }})} placeholder="email" className={styles.input} type="email" />
            <p>{errors.emailForm?.message}</p>
          </div>
          <div>
            <input {...register("nameForm",{required: "обязательное поле name"})} placeholder={"name"} className={styles.input} type="text" />
            <p>{errors.nameForm?.message}</p>
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
