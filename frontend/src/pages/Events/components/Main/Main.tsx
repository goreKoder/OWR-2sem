import styles from "./Main.module.scss";
import { getEventsapi, getSelectEventsapi } from "../../../../api/eventService";
import { useEffect, useState, useRef } from "react";
import ChangeEvent from "./ChangeEvent/ChangeEvent";
import CreatEvent from "./CreatEvent/CreatEvent";
import DeleteEvents from "./DeleteEvent/DeleteEvent";
import HidingPanel from "./HidingPanel/HidingPanel";
// import { AxiosResponse } from 'axios'
export default function Main() {
  interface Ievent {
    createdby: number;
    date: Date;
    description: string;
    enddate: Date;
    id: number;
    startdate: Date;
    title: string;
  }

  const refInput1 = useRef<HTMLInputElement>(null)
  const refInput2 = useRef<HTMLInputElement>(null)
  const [date1, setDate1] = useState(''); // Состояние для первого input
  const [date2, setDate2] = useState(''); // Состояние для второго input

  const cookiesObj = Object.fromEntries(
    document.cookie
      .split("; ")
      .map((c) => c.split("="))
      .filter(([key]) => key === "registerIndicator"),
  );

  let registerIndicator: boolean = false;
  registerIndicator = cookiesObj.registerIndicator === "true"; //   создаю обьект из куков
  const [events, setEvents] = useState<Ievent[]>([]);

  useEffect(() => {
    //срабатывает только после перезагрузки

    if (!registerIndicator) return; //  проеряем зарегистрирован ли пользователь

    async function loadEvents() {
      try {
        const response = await getEventsapi();

        // Проверяем, что данные - массив
        if (Array.isArray(response?.data)) {
          setEvents(response.data);
        } else {
          console.error("Ожидался массив событий, получено:", response);
          setEvents([]); // Устанавливаем пустой массив при ошибке
        }
      } catch (error) {
        console.error("Ошибка загрузки событий:", error);
        setEvents([]);
      }
    }
    loadEvents();
  }, [registerIndicator]); //  надо добавить сюда зависимости от ChangeEvent и CreatEvent


  useEffect(()=>{//       выборка но датам
    async function loadEvents() {
      if(date1 !== ''&& date2 !== ''){
        let startdate: Date = new Date(date1)
        let enddate: Date = new Date  (date2)
        let response = await getSelectEventsapi({startdate,enddate})
        setEvents(response?.data);
      }
    }
    loadEvents()
  },[date1, date2])

  return (
    <main className={styles.main}>
      <div className={styles.div_input}>
        <input ref={refInput1}
        onChange={()=>{
          if(refInput1.current){
            setDate1(refInput1.current?.value)
          }
          }
          }
          className={styles.input}
          type="date"
          placeholder="введите дату"
        />
        <input
        ref={refInput2}
        onChange={()=>{
          if(refInput2.current){
            setDate2(refInput2.current?.value)
          }
          }
          }
          className={styles.input}
          type="date"
          placeholder="введите дату"
        />
      </div>

      <div className={styles.conttaner}>
        <div className={styles.main_card}>
          <CreatEvent></CreatEvent>
        </div>
        {events.map(
          (
            e, //events != null &&
          ) => (
            <div key={e.id} className={styles.main_card}>
              <h3>{e.title}</h3>
              <ChangeEvent id={e.id}></ChangeEvent>
              <p>{e.description}</p>
              <span className={styles.bottom_info_line}>
                <p>{new Date(e.startdate).toLocaleDateString()}</p>
                <DeleteEvents id={e.id} />
              </span>
            </div>
          ),
        )}
      </div>
      <HidingPanel registerIndicatorProps={registerIndicator} />
    </main>
  );
}
