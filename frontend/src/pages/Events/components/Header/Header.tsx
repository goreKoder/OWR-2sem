import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Header() {
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
            <Link to="/" className={styles.nav_a}>
              Главная
            </Link>
            <Link to="*" className={styles.nav_a}>
              Проекты
            </Link>
            <Link to="/register" className={styles.nav_a}>
              Регистрация
            </Link>
            <p className="i_here">Список мероприятий</p>
            {/*надо будет поменят клас*/}
          </nav>
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
                <li>
                  <Link to="/register" className={styles.burger_nav_a}>
                    Регистрация
                  </Link>
                </li>
                <li>
                  <p className={styles.burger_i_here}>Список мероприятий</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <hr />
    </>
  );
}
