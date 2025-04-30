// import { Link } from 'react-router-dom'
import styles from "../../Login.module.scss";
import { useRef } from "react";
import { LoginUser } from "../../../../api/authService";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); //  неработает внутри асинхронных функций
  return (
    <main className={styles.main}>
      <div className={styles.contaner}>
        <div className="TimeSpark">
          {/* <img className={styles.img} src="" alt="" /> */}
          <h1 className={styles.h1}>TimeSpark</h1>
        </div>
        <div className="new_account">
          <h2>войти в аккаунт</h2>
          {/* <img src="" alt="" /> */}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // нужно чтобы данные не обновились
            // console.log("началось")
            if (emailRef.current && passwordRef.current) {
              const password = passwordRef.current.value;
              const email = emailRef.current.value;
              const LoginAsync = async () => {
                const boolIndikat = await LoginUser({ email, password });
                if (boolIndikat == true) {
                  navigate("/events");
                }
              };
              LoginAsync();
            }
          }}
          className={styles.form}
        >
          <div>
            <input ref={emailRef} className={styles.input} type="text" />
          </div>
          <div>
            <input ref={passwordRef} className={styles.input} type="text" />
          </div>
          {/* <input type="text" /> */}
          <button type="submit" className={styles.button}>
            Войти
          </button>
          {/* <p>Уже зарегестрированы?</p> */}
          {/* <p>Не повезло</p> */}
          {/* <Link to='/'>Войти в аккаунт</Link> */}
        </form>
      </div>
    </main>
  );
}
