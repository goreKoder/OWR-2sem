import styles from "./DeleteEvent.module.scss";
import { deleteEventsapi } from "../../../../../api/eventService";
import { useContext,useRef } from "react";

import { AuthorizationIndicatorContext } from "../../../../../components/context/authorizationIndicator";
interface Props {
  id: number | undefined;
}
export default function DeleteEvent({ id }: Props) {

  const dialogRef = useRef<HTMLDialogElement>(null);

  const {DeleteEventState, setDeleteEventState} = useContext(AuthorizationIndicatorContext)

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
            async function EventAsync(){
              const request = await deleteEventsapi({ id });
              if(request){
                setDeleteEventState(!DeleteEventState)
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
