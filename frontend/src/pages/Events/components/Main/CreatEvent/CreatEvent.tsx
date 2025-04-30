import styles from "./CreatEvent.module.scss";
import { useRef,useContext } from "react";
import { postEventsapi } from "../../../../../api/eventService";

import { AuthorizationIndicatorContext } from "../../../../../components/context/authorizationIndicator";
import { useForm } from "react-hook-form";
export default function CreatEvent() {
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const {CreatEventState, setCreatEventState} = useContext(AuthorizationIndicatorContext)
  return (
    <>
    <div className={styles.add_task}>
      <div
        className={styles.add_task_contaner}
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        </div>
        </div>
        <dialog ref={dialogRef} id={styles.myDialog}>
          <form method="dialog" onSubmit={handleSubmit((Data) => {
                    const title = Data.titleForm;
                    const description = Data.descriptionForm;
                    const date: Date = new Date(Data.dateForm);
                    async function EventAsync (){
                      const request = await postEventsapi({ title, description, date });
                      if(request){
                        setCreatEventState(!CreatEventState);
                      }
                    }
                    EventAsync()
                    dialogRef.current?.close(); //   закрываю модалку
                })} className={styles.form} >
            
            <input {...register("titleForm", {required: "обязательное поле title"})}
              placeholder="Название"
              className={styles.title_input}
              type="text"
              id="taskInput"
            />
            <p>{errors.titleForm?.message}</p>
            <br />
            <input {...register("descriptionForm", {required: "обязательное поле description"})}
              placeholder="Описание"
              className={styles.description_input}
              type="text"
              id="taskInput"
            />
            <p>{errors.descriptionForm?.message}</p>
            <br />
            <input  {...register("dateForm", {required: "обязательное поле date"})}
              className={styles.date_input}
              type="date"
              id="taskInput"
            />
            <p>{errors.dateForm?.message}</p>
            <div className={styles.div_button}>
              <button
                className={styles.button_form}
                type="submit"
                value="default"
              >
                Подтвердить
              </button>
              <button className={styles.button_form} value="cancel" type="button" onClick={(e)=>{
                e.preventDefault();
                console.log("по идее работает")
                dialogRef.current?.close(); //   закрываю модалку
              }}>
                Отмена
              </button>
              
            </div>
          </form>
        </dialog>
        </>
  );
}
