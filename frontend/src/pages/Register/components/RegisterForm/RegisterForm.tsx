import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react"; //ссылочки на HTML элементы
import { RegisterUser } from "../../../../api/authService"; //не смог установить алиасы
import styles from "../../Register.module.scss";
export default function RegisterForm() {
  const usernameRef = useRef<HTMLInputElement>(null); // устанавливаем типы
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <div className={styles.contaner}>
        <div className="TimeSpark">
          <img src="" alt="" />
          <h1 className={styles.h1}>TimeSpark</h1>
        </div>
        <div className="new_account">
          <h2 className={styles.h2}>Новый аккаунт</h2>
          <img src="" alt="" />
        </div>
        {/* <div> */}
        <form
          onSubmit={(event) => {
            event.preventDefault(); //предотвращает перезагрузку страници
            if (
              usernameRef.current &&
              passwordRef.current &&
              emailRef.current &&
              roleRef.current
            ) {
              //проверяем что нет null потому что TS жалуется
              const name = usernameRef.current.value;
              const password = passwordRef.current.value;
              const email = emailRef.current.value;
              const role = roleRef.current.value;

              const LoginAsync = async () => {
                const boolIndikat = await RegisterUser({
                  email,
                  name,
                  password,
                  role,
                });
                console.log(boolIndikat);
                if (boolIndikat == true) {
                  console.log(boolIndikat);
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
            <input ref={usernameRef} className={styles.input} type="text" />
          </div>
          <div>
            <input ref={passwordRef} className={styles.input} type="text" />
          </div>
          <div>
            <input ref={roleRef} className={styles.input} type="text" />
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
