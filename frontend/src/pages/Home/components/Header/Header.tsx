import { useContext, useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AuthorizationIndicatorContext } from "../../../../components/context/authorizationIndicator";
export default function Header() {

    const {IndicatorState} = useContext(AuthorizationIndicatorContext)
    
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
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
            {IndicatorState? <></> : <Link to="/register" className={styles.nav_a}>
              Регистрация
            </Link>}
            <Link to="/events" className={styles.nav_a}>
              Список мероприятий
            </Link>
          </nav>
          <div>{IndicatorState? <><p className={styles.userName}>{localStorage.getItem("userName")}</p></>: <p className={styles.userName}>Неавторизованный пользователь</p>}
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
                {IndicatorState? <></> : <li>
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
