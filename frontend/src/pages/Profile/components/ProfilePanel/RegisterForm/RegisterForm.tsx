import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react"; //ссылочки на HTML элементы
// import { RegisterUser } from "../../../../api/authService"; //не смог установить алиасы 
import {useForm} from "react-hook-form";
import styles from "./RegisterForm.module.scss";
import { useAppDispatch,useAppSelector } from "../../../../../app/store";
import { ChangeUser } from "../../../../../api/authService";
// import { AuthorizationIndicatorContext } from "../../../../components/context/authorizationIndicator";

// interface UserData {
//   email: string;
//   firstName?:string;//имя
//   lastName?:string;//фамилия
//   patronymic?:string;//отчество
//   gender?: "М"| "Ж";
//   birthday?: Date;
//   password?: string;
//   role?: 'user' | 'admin';
// }

export default function RegisterForm() {

  const user = useAppSelector(state=>state.auth.user)
  const dialogRef = useRef<HTMLDialogElement>(null);
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
  let gender:'М'|'Ж' = "М"
  if(user.gender){
    gender = user.gender
  }
  const {register, handleSubmit, formState:{errors}} = useForm<Input>({defaultValues:{
    emailForm: user.email? user.email : "",
    firstNameForm:user.firstName? user.firstName : "",
    lastNameForm:user.lastName? user.lastName : "",
    patronymicForm:user.patronymic? user.patronymic : "",
    genderForm:gender ,
    birthdayForm:user.birthday? user.birthday : new Date("01.01.2001"),
    passwordForm: "",
    roleForm:user.role? user.role : 'user'
  }})


  const dispatch = useAppDispatch();//  выгружаем thunk для изменений значений
  const Indicator = useAppSelector(state => state.auth.isAuth)
  const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)
  // let errorIndicator: boolean = false// если ошибка регистрации то становится true и выводится окно с ошибкой
  // const [errorText, setErrorText] = useState("")
  return (
    <>
      <div className={styles.editingImg} onClick={()=>{
        dialogRef.current?.showModal();
      }}></div>
      {/* <div className={styles.contaner}>
      <div>
        
      </div>
      
    </div> */}
    
    <dialog ref={dialogRef} id={styles.myDialog}>
      <div className={styles.contaner}>
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
                const IndicatorRegister = await dispatch(ChangeUser({//    отправляю запрос на регистрацию
                  email,
                  firstName, lastName, patronymic, gender, birthday,
                  password,
                  role,JWTtokenSelect
                }))
                
              };
              LoginAsync();
              dialogRef.current?.close();
            
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
          <div>
            <button type="submit" className={styles.button}>
            Изменить данные
          </button>
          </div>
          <div>
            <button type="button" className={styles.button} onClick={()=>{
              dialogRef.current?.close();
            }}>
              Отменить изменение
            </button>
          </div>
          
        </form>
        </div>
        </dialog>
        
    </>
  );
}
