import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthorizationIndicatorContext } from "../../../../components/context/authorizationIndicator";
export default function Header() {

  const {IndicatorState} = useContext(AuthorizationIndicatorContext)

  const [isOpen, setIsOpen] = useState<boolean>(false);// штука для бургер меню
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
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
            {IndicatorState?<></> :<Link to="/register" className={styles.nav_a}>
              Регистрация
            </Link>}
            <p className="i_here">Список мероприятий</p>
            {/*надо будет поменят клас*/}
          </nav>
          <div>{IndicatorState? <><p className={styles.userName}>{localStorage.getItem("userName")}</p></>: <p className={styles.userName}>Неавторизованный пользователь</p>}{/* отображение имени авторизованного пользователя*/}
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
                  <Link to="/events" className={styles.burger_nav_a}>
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="*" className={styles.burger_nav_a}>
                    Проекты
                  </Link>
                </li>
                {IndicatorState?<></> :<li>
                  <Link to="/register" className={styles.burger_nav_a}>
                    Регистрация
                  </Link>
                </li>}
                
                <li>
                  <p className={styles.burger_i_here}>Список мероприятий</p>
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
