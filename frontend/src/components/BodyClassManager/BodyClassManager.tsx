import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BodyClassManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Удаляем все предыдущие классы body
    document.body.className = "";

    // Добавляем класс в зависимости от маршрута
    switch (location.pathname) {
      case "/":
        document.body.classList.add("body--home");
        break;
      case "/register":
        document.body.classList.add("body--register");
        break;
      case "/login":
        document.body.classList.add("body--login");
        break;
      case "/events":
        document.body.classList.add("body--events");
        break;
      default:
        document.body.classList.add("body--not-found");
    }
  }, [location.pathname]);

  return null; // Этот компонент ничего не рендерит
};

export default BodyClassManager;
