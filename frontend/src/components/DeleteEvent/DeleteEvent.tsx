import styles from "./DeleteEvent.module.scss";
// import { deleteEventsapi } from "../../../../../api/eventService";
import { useContext,useRef } from "react";
import { deleteEvents, getEvents, postEvents } from "../../api/eventService";
import { useAppDispatch, useAppSelector } from "../../app/store";
interface Props {
  id: number | undefined;
}
export default function DeleteEvent({ id }: Props) {

  const dialogRef = useRef<HTMLDialogElement>(null);
  const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)//  кастомным хуком вытаскиваю состояние
  const error = useAppSelector(state => state.event.isError)


  const dispatch = useAppDispatch()
  
  return (
    <>
    <div
      onClick={() => {
        dialogRef.current?.showModal();
      }}
      className={styles.div_contaner}
    ></div>
    <dialog ref={dialogRef} className={styles.dialog_contaner}>
    <div className={styles.div_contaner_model}>
      {/* <div> */}
        <p className={styles.p}>Точно удаляем?</p>
        <div>
        <button
          onClick={() => {
            async function EventAsync() {
              const request = await dispatch(deleteEvents({ id,JWTtokenSelect }));//   запрос на изменение
              if(!error){
                await dispatch(getEvents(JWTtokenSelect))//   запрос на получение списка ивентов (возможно стоит убрать await, и выводить загрузку на странице Events)
              }
              }
            EventAsync()
            dialogRef.current?.close();
          }}
          className={styles.button}
        >
          Да
        </button>
        <button
          onClick={() => {
            dialogRef.current?.close();
          }}
          className={styles.button}
        >
          Нет
        </button>
        </div>
        
      {/* </div> */}
    </div>
  </dialog></>
  );
}
