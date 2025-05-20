import styles from "./ChangeEvent.module.scss";
import { useRef,useContext } from "react";
// import { putEventsapi } from "../../../../../api/eventService";
import {useForm} from "react-hook-form"

import { useAppDispatch, useAppSelector } from "../../app/store";
import {postEvents,getEvents, putEvents} from "../../api/eventService"

interface Props {
  id: number | undefined;
}
export default function ChangeEvent({ id }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)//  кастомным хуком вытаскиваю состояние
  const error = useAppSelector(state => state.event.isError)

  interface Input{
    titleForm: string,
    descriptionForm:string,
    dateForm:Date,
  }
  const {register,handleSubmit,formState:{errors}} = useForm<Input>({
    defaultValues: {
      titleForm: "",
      descriptionForm:"",
    },
  })

  // const {ChangeEventState, setChangeEventState} = useContext(AuthorizationIndicatorContext)
  const dispatch = useAppDispatch()
  return (
    <>
      <button
        className={styles.button_component}
        onClick={() => {
          // оно должно быть здесь что-бы было проще с состоянием
          dialogRef.current?.showModal(); //   открываю модалку
        }}
      >
        редактировать
      </button>

      <dialog ref={dialogRef} className={styles.dialog_contaner}>
        <form method="dialog" onSubmit={handleSubmit((Data) => {
                    const title = Data.titleForm;
                    const description = Data.descriptionForm;
                    const date: Date = new Date(Data.dateForm);
                    async function EventAsync() {
                      const request = await dispatch(putEvents({ title, description, date, id,JWTtokenSelect }));//   запрос на изменение
                    if(!error){
                      await dispatch(getEvents(JWTtokenSelect))//   запрос на получение списка ивентов (возможно стоит убрать await, и выводить загрузку на странице Events)
                    }
                    }
                    EventAsync()
                  
                  dialogRef.current?.close(); //   закрываю модалку
                })}>
          <div className={styles.div_contaner}>
            <div>
              <input  {...register("titleForm", {required: "обязательное поле title"})}
                placeholder="Название"
                className={styles.title_input}
                type="text"
                id="taskInput"
              />
              <p>{errors.titleForm?.message}</p>
              <br />
              <input  {...register("descriptionForm", {required: "обязательное поле description"})}
                placeholder="Описание"
                className={styles.description_input}
                type="text"
                id="taskInput"
              />
              <p>{errors.descriptionForm?.message}</p>
              <br />
              <input {...register("dateForm", {required: "обязательное поле date"})}
                className={styles.date_input}
                type="date"
                id="taskInput"
              />
              <p>{errors.dateForm?.message}</p>
              <button className={styles.button} type="submit"
              >
                Изменить
              </button>
              <button className={styles.button} value="cancel" type="button" onClick={()=>{
                console.log("работает")
                dialogRef.current?.close();
              }}>
                Отмена
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}
