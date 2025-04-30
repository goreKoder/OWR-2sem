import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>404</h1>
      <h2 className={styles.h2}>Страница не найдена</h2>
      <Link to={"/"}>
        <button className={styles.button}>Перейти на главную</button>
      </Link>
    </main>
  );
}
