import styles from "./Main.module.scss";
import { getEventsapi } from "../../../../api/eventService";
import { useEffect, useState } from "react";
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

  return (
    <main className={styles.main}>
      <div className={styles.div_input}>
        <input
          className={styles.input}
          type="date"
          placeholder="введите дату"
        />
        <input
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
