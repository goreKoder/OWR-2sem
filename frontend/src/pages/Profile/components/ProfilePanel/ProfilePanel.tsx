import style from "./ProfilePanel.module.scss"
import { useAppSelector } from "../../../../app/store"
import RegisterForm from "./RegisterForm/RegisterForm"

export default function ProfilePanel(){
    const user = useAppSelector(state=>state.auth.user)
    let birthday: string = ""
    // console.log("День рождения в профиле")
    // console.log(user.birthday)
    if(user.birthday){
        birthday = new Date(user.birthday).toLocaleDateString()//   без вызова функции конструктора ничего не получалось
    }
    return(
        <>
            <div className={style.profilePanelContaner}>
                <div>
                    <h2 className={style.h2}>Профиль</h2>
                <div className={style.userInfoDiv}>
                    <div>
                        <p className={style.userInfo}>Имя: {user.firstName}</p>
                    <p className={style.userInfo}>Фамилмя: {user.lastName}</p>
                    <p className={style.userInfo}>Отчество:{user.patronymic}</p>
                    <p className={style.userInfo}>Почта: {user.email}</p>
                    <p className={style.userInfo}>Роль: {user.role}</p>
                    <p className={style.userInfo}>Пол: {user.gender}</p>
                    <p className={style.userInfo}>День рождения:{birthday}</p>
                    </div>
                    <RegisterForm/>
                
                </div>
                </div>
                
                
            </div>
            
        </>
    )
}