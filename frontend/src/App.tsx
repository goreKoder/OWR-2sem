import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BodyClassManager from "./components/BodyClassManager/BodyClassManager";
import "./components/BodyClassManager/BodyClassManager.scss";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";

import { Provider } from "react-redux";//   обёртка для компонентов 
import { store } from "./app/store";
import ErrorBlock from "./components/ErrorBlock/ErrorBlock";
// import {AuthorizationIndicatorProvider} from './components/context/authorizationIndicator'// useContecst
function App() {
  return (
    <Provider store={store}>
      <ErrorBlock/>
    {/* <AuthorizationIndicatorProvider> */}
      <BrowserRouter>
        <BodyClassManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    {/* </AuthorizationIndicatorProvider> */}
    </Provider>
  );
}

export default App;
