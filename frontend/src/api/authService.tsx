import apiServer from "./axios";
interface UserData {
  email: string;
  name?: string;
  password: string;
  role?: 'user' | 'admin';
}


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
      console.log("при регистрации ошибок не возникло"+ response)
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
      console.log(response);
      document.cookie = `JWTtoken=${response.data.JWTtocen}; max-age=${30 * 60};`; //сохраняю JWT в cookie
      document.cookie = `registerIndicator=true; max-age=${30 * 60};`; // созранил данные о авторизации пользователя
      localStorage.setItem("JWTtoken",response.data.JWTtocen)
      
      //составляем пользователя в localStorage
      localStorage.setItem("userEmail",response.data.user.email)
      localStorage.setItem("userId",response.data.user.id)
      localStorage.setItem("userName",response.data.user.name)
      localStorage.setItem("userRole",response.data.user.role)
    }

    return true;
  } catch (err) {
    console.error("Ошибка авторизации:" + err);
    return false;
  }
}

