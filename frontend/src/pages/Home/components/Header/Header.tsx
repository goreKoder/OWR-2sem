import { useContext, useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AuthorizationIndicatorContext } from "../../../../components/context/authorizationIndicator";
import { useAppSelector } from "../../../../app/store";
export default function Header() {

  // const {IndicatorState} = useContext(AuthorizationIndicatorContext)
    
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  const userName = useAppSelector(state => state.auth.user?.name)// выводим имя пользователя из стейта
  return (
    <>
      <header className={styles.header}>
        <div className="nav_div">
          <div>TimeSpark</div>
          <nav className="nav">
            <p className="i_here">Главная</p>
            {/*надо будет поменят клас*/}
            <Link to="*" className={styles.nav_a}>
              Проекты
            </Link>
            {userName? <></> : <Link to="/register" className={styles.nav_a}>
              Регистрация
            </Link>}
            <Link to="/events" className={styles.nav_a}>
              Список мероприятий
            </Link>
          </nav>
          <div>{userName? <><p className={styles.userName}>{userName}</p></>: <p className={styles.userName}>Неавторизованный пользователь</p>}
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
                  <p className={styles.burger_i_here}>Главная</p>
                </li>
                <li>
                  <Link to="*" className={styles.burger_nav_a}>
                    Проекты
                  </Link>
                </li>
                {userName? <></> : <li>
                  <Link to="/register" className={styles.burger_nav_a}>
                    Регистрация
                  </Link>
                </li>}
                <li>
                  <Link to="/events" className={styles.burger_nav_a}>
                    Список мероприятий
                  </Link>
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
