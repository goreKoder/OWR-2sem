import styles from "./ChangeEvent.module.scss";
import { useRef } from "react";
import { putEventsapi } from "../../../../../api/eventService";

interface Props {
  id: number | undefined;
}
export default function ChangeEvent({ id }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        className={styles.button_component}
        onClick={() => {
          // оно должно быть здесь чтобы было проще с состоянием
          dialogRef.current?.showModal(); //   открываю модалку
        }}
      >
        редактировать
      </button>

      <dialog ref={dialogRef} className={styles.dialog_contaner}>
        <form method="dialog">
          <div className={styles.div_contaner}>
            <div>
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
              <button
                onClick={() => {
                  if (
                    titleRef.current &&
                    descriptionRef.current &&
                    dateRef.current
                  ) {
                    const title = titleRef.current?.value;
                    const description = descriptionRef.current?.value;
                    const date: Date = new Date(dateRef.current?.value);
                    putEventsapi({ title, description, date, id });
                  }
                  dialogRef.current?.close(); //   закрываю модалку
                }}
                className={styles.button}
              >
                Изменить
              </button>
              <button className={styles.button} value="cancel">
                Отмена
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}
