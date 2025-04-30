import apiServer from "./axios";

interface UserData {
  email: string;
  name?: string;
  password: string;
  role?: string;
}

// export const registerIndicator:boolean = true;  //   так я планировал отобразать данные о авторизации пользователя

export async function RegisterUser({ email, name, password, role }: UserData) {
  try {
    const response = await apiServer.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    if (response.data instanceof Error) {
      console.error("Ошибка с сервера при регистрации:" + response.data); //    НАДО БУДЕТ ЗАМЕНИТЬ НА РЕАЛЬНЫЙ БЛОК ИНФОРМИРУЮЩИЙ ОБ ОШИБКЕ
    } else {
      LoginUser({ email, password });
    }
    return true; // по идее это не нужно
  } catch (err) {
    console.error("Ошибка регистрации:" + err);
    throw err; // или return { error: err.message };
  }
}
export async function LoginUser({ email, password }: UserData) {
  // console.log(
  //     email,
  //     password)
  try {
    const response = await apiServer.post("/auth/login", {
      email,
      password,
    });
    if (response.data instanceof Error) {
      console.error("Ошибка с сервера при входе:" + response.data); //    НАДО БУДЕТ ЗАМЕНИТЬ НА РЕАЛЬНЫЙ БЛОК ИНФОРМИРУЮЩИЙ ОБ ОШИБКЕ
    } else {
      document.cookie = `JWTtoken=${response.data}; max-age=${30 * 60};`; //сохраняю JWT в cookie
      document.cookie = `registerIndicator=true; max-age=${30 * 60};`; // созранил данные о авторизации пользователя
    }

    return true;
  } catch (err) {
    console.error("Ошибка регистрации:" + err);
    throw err; // или return { error: err.message };
  }
}
