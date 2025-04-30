import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BodyClassManager from "./components/BodyClassManager/BodyClassManager";
import "./components/BodyClassManager/BodyClassManager.scss";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

import {AuthorizationIndicatorProvider} from './components/context/authorizationIndicator'
function App() {
  return (
    <AuthorizationIndicatorProvider>
      <BrowserRouter>
        <BodyClassManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthorizationIndicatorProvider>
  );
}

export default App;
