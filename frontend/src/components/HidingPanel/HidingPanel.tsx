import styles from "./HidingPanel.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

interface DialogProps {
  registerIndicatorProps: boolean; // Правильное имя пропса
}
export default function HidingPanel({ registerIndicatorProps }: DialogProps) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (registerIndicatorProps) {
      console.log("НЕ должна появиться модалка" + registerIndicatorProps);
      dialogRef.current?.close();
    } else {
      console.log("должна появиться модалка" + registerIndicatorProps);
      dialogRef.current?.showModal();
    }
  }, [registerIndicatorProps]);

  return (
    <dialog ref={dialogRef} className={styles.dialog_contaner}>
      <div className={styles.div_contaner}>
        <div>
          <p className={styles.p}>опа</p>
          <p className={styles.p}>а куда это мы</p>
          <p className={styles.p}>без регистрации?</p>
          <button
            onClick={() => {
              dialogRef.current?.close();
              navigate("/register");
            }}
            className={styles.button}
          >
            Регистрация
          </button>
        </div>
      </div>
    </dialog>
  );
}
