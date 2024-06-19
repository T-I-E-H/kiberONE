import { useContext } from "react";
import { Link, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Demo from "./pages/Demo";
import Childs from "./pages/Children"
import Misses from "./pages/Misses"
import style from "./app.module.scss";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { isUserLogged } = useContext(AuthContext);

  return (
    <div className={style.wrapper}>
      <SnackbarProvider />
      <BrowserRouter>
        <Routes>
          {isUserLogged ? (
            <>
            <Route path="demo" element={<Demo />} />
            <Route path="children" element={<Childs/>}/>
            <Route path="children/misses" element={<Misses/>}/>
            </>
            
          ) : (
            <>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </>
          )}

          <Route  
            path="*"
            element={<Navigate to={isUserLogged ? "demo" : "sign-in"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
