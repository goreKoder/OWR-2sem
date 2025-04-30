import styles from "./CreatEvent.module.scss";
import { useRef } from "react";
import { postEventsapi } from "../../../../../api/eventService";

export default function CreatEvent() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.add_task}>
      <div
        className={styles.add_task_contaner}
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <dialog ref={dialogRef} id={styles.myDialog}>
          <form className={styles.form} method="dialog">
            <input
              ref={titleRef}
              className={styles.title_input}
              type="text"
              id="taskInput"
            />
            <br />
            <input
              ref={descriptionRef}
              className={styles.description_input}
              type="text"
              id="taskInput"
            />
            <br />
            <input
              ref={dateRef}
              className={styles.date_input}
              type="date"
              id="taskInput"
            />
            <div className={styles.div_button}>
              <button
                className={styles.button_form}
                onClick={() => {
                  if (
                    titleRef.current &&
                    descriptionRef.current &&
                    dateRef.current
                  ) {
                    const title = titleRef.current?.value;
                    const description = descriptionRef.current?.value;
                    const date: Date = new Date(dateRef.current?.value);
                    postEventsapi({ title, description, date });
                  }
                }}
                value="default"
              >
                Подтвердить
              </button>
              <button className={styles.button_form} value="cancel">
                Отмена
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
}
