import styles from "./Main.module.scss";
// import { getEventsapi, getSelectEventsapi } from "../../../../api/eventService";
import { useEffect, useState, useRef } from "react";
import ChangeEvent from "../../../../components/ChangeEvent/ChangeEvent"
import CreatEvent from "../../../../components/CreatEvent/CreatEvent";
import DeleteEvents from "../../../../components/DeleteEvent/DeleteEvent";
import HidingPanel from "../../../../components/HidingPanel/HidingPanel";

import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { getEvents, getSelectEvents } from "../../../../api/eventService";

export default function Main() {
  interface Ievent {//  интерфейс массива событий
    createdby: number;
    date: Date;
    description: string;
    enddate: Date;
    id: number;
    startdate: Date;
    title: string;
  }
  console.log("Event")

  const refInput1 = useRef<HTMLInputElement>(null)//  выгрузка событий по датам
  const refInput2 = useRef<HTMLInputElement>(null)
  const [date1, setDate1] = useState(''); // Состояние для первого input
  const [date2, setDate2] = useState(''); // Состояние для второго input

  const dispatch = useAppDispatch()
  
  const events = useAppSelector(state => state.event.arrEvent)//  массив событий
  
  const IndicatorState = useAppSelector(state => state.auth.isAuth)//   идентификатор авторизации пользователя
  const JWTtokenSelect = useAppSelector(state => state.auth.isJWT)//  кастомным хуком вытаскиваю состояние

  console.log("isAuth из Event = "+IndicatorState)

  useEffect(()=>{
    const res = dispatch(getEvents(JWTtokenSelect))
  },[])


  useEffect(()=>{//       выборка но датам
    console.log(IndicatorState+" 2")
    async function loadEvents() {
      if(date1 !== ''&& date2 !== ''){
        let startdate: Date = new Date(date1)
        let enddate: Date = new Date  (date2)
        await dispatch(getSelectEvents({startdate,enddate,JWTtokenSelect}))
        // setEvents(response?.data);
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
        {events? events.data.map(
          (
            e //events != null &&
          ) => (
            <div key={e.id} className={styles.main_card}>
              <h3>{e.title}</h3>
              <ChangeEvent id={e.id}></ChangeEvent>
              <p>{e.description}</p>
              <span className={styles.bottom_info_line}>
                <p>{e.startdate? new Date(e.startdate).toLocaleDateString(): undefined}</p>{/* ругалось на то что e.startdate может быть undefined */}
                <DeleteEvents id={e.id} />
              </span>
            </div>
          ),
        ):<></>}
      </div>
      <HidingPanel registerIndicatorProps={IndicatorState} />
      
    </main>
    
  );
  
}
