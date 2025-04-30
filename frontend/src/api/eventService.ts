import apiServer from "./axios";

interface Ievent {
  createdby?: number;
  date?: Date;
  description?: string;
  enddate?: Date;
  id?: number;
  startdate?: Date;
  title?: string;
}

const cookiesObj = Object.fromEntries(
  document.cookie.split("; ").map((c) => c.split("=")),
);
// const {email, name, password, role}: UserData =
export async function getEventsapi() {
  try {
    const response = await apiServer.get(
      "/index/events",
      {
        //извлечение всех ивентов
        headers: {
          Authorization: `Bearer ${cookiesObj.JWTtoken}`,
        },
      },
    );
    return response; 
  } catch (err) {
    console.log("ошибка выгрузки событий" + err);
  }
}

export async function postEventsapi({ title, description, date }: Ievent) {
  //     добавление события
  try {
    const response = await apiServer.post(
      "/index/events",
      {
        title,
        description,
        date,
        startdate: date,
        enddate: date,
      },
      {
        headers: {
          Authorization: `Bearer ${cookiesObj.JWTtoken}`,
        },
      },
    );
    return response; 
  } catch (err) {
    console.log("ошибка создания события" + err);
  }
}

export async function putEventsapi({ title, description, date, id }: Ievent) {
  try {
    const response = await apiServer.put(
      "/index/events/" + id, //изменение ивента
      {
        title,
        description,
        date,
        startdate: date,
        enddate: date,
      },
      {
        headers: {
          Authorization: `Bearer ${cookiesObj.JWTtoken}`,
        },
        params: {
          id,
        },
      },
    );
    return response; 
  } catch (err) {
    console.log("ошибка изменения события" + err);
  }
}

export async function deleteEventsapi({ id }: Ievent) {
  try {
    const response =
      await apiServer.delete(
        "/index/events/" + id, //удаление ивента
        {
          headers: {
            Authorization: `Bearer ${cookiesObj.JWTtoken}`,
          },
          params: {
            id,
          },
        },
      );
    return response; 
  } catch (err) {
    console.log("ошибка удаления события" + err);
  }
}

export async function getSelectEventsapi({startdate, enddate}:Ievent) {
  try {
    const response = await apiServer.get(
      "/public/events",
      {
        //извлечение всех ивентов
        headers: {
          Authorization: `Bearer ${cookiesObj.JWTtoken}`,
        },
        params: {
          startdate ,
          enddate
        },
      },
    );
    return response; 
  } catch (err) {
    console.log("ошибка выгрузки событий" + err);
  }
}