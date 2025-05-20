import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useAppSelector } from "../../app/store";
import {useLocation} from "react-router-dom"//  буду смотреть на текущий путь и выбирать стили

export default function Header() {

  const location = useLocation()
  // useEffect(()=>{
  //   let nav_a = document.getElementsByClassName("nav_a")
  //   nav_a.
  // },[location.pathname])

  const [isOpen, setIsOpen] = useState<boolean>(false);// штука для бургер меню
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  const userName = useAppSelector(state => state.auth.user?.firstName)// выводим имя пользователя из стейта

  return (
    <>
      <header className={styles.header}>
        <div className="nav_div">
          <div>TimeSpark</div>
          <nav className="nav">
            <Link to="/" className={styles.nav_a}>
              Главная
            </Link>
            <Link to="*" className={styles.nav_a}>
              Проекты
            </Link>
            {userName?<></> :<Link to="/register" className={styles.nav_a}>
              Регистрация
            </Link>}
            <Link to="/events" className={styles.nav_a}>Список мероприятий</Link>
            {/*надо будет поменят клас*/}
          </nav>
          <div className={styles.userNameDiv}>{userName? <><Link to="/profile" className={styles.userName}>{userName}</Link></>: <p className={styles.userName}>Неавторизованный пользователь</p>}{/* отображение имени авторизованного пользователя*/}
          <div className={styles.burger_memu_div}>
            <input id={styles.burger_toggle} type="checkbox" />
            <label
              onClick={toggleMenu}
              htmlFor="burger_toggle"
              className={`${styles.burger} ${isOpen ? styles.activ : ""}`}
            >
              <span></span>
            </label>
            <div
              className={`${styles.burger_memu} ${isOpen ? styles.show : ""}`}
            >
              <ul>
                <li>
                  <Link to="/" className={styles.burger_nav_a}>
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="*" className={styles.burger_nav_a}>
                    Проекты
                  </Link>
                </li>
                {userName?<></> :<li>
                  <Link to="/register" className={styles.burger_nav_a}>
                    Регистрация
                  </Link>
                </li>}
                
                <li>
                  <Link to="/events" className={styles.burger_nav_a}>Список мероприятий</Link>
            
                </li>
                <li>
                  <Link to="/profile" className={styles.burger_nav_a}>Профиль пользователя</Link>
                </li>
              </ul>
            </div>
          </div>
          </div>
          
        </div>
      </header>
      <hr />
    </>
  );
}
