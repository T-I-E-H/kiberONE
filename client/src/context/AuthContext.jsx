import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Circle } from "react-preloaders";
import inMemoryJWT from "../services/inMemoryJWT";
import config from "../config";
import style from "../app.module.scss";
import showErrorMessage from "../utils/showErrorMessage";

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});

export const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/resource`,
});

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthContext = createContext({});
// Функции
const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [data, setData] = useState();
  const today = new Date();  
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate()+1;
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = yyyy + '-' + mm + '-' + dd;
  const [day, setDay] = useState(formattedToday);
    
  const moveDate = (direction) =>{
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate()+direction;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    setDay(formattedToday)
  }
  const handleFetchProtected = () => {
    ResourceClient.get("/children")
      .then((res) => {
        setData(res.data);
      })
      .catch(showErrorMessage);
  };
  const handleChildMisses = (id) => {
    ResourceClient.post("/children/"+id, {
      day: day
    })
    .then((res) =>{
      !res.data.length ? setData(res.data) : setData(null);
    })
    .catch(showErrorMessage);
  }
  

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then(() => {
        setIsUserLogged(false);
        inMemoryJWT.deleteToken();

        setData();
      })
      .catch(showErrorMessage);
  };



  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      })
      .catch(showErrorMessage);
  };
  
  const handleSignIn = (data) => {
    AuthClient.post("/sign-in", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      })
      .catch(showErrorMessage);
  };
  

 // Misc
  useEffect(() => {
    AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsAppReady(true);
        setIsUserLogged(false);
      });
  }, []);

  useEffect(() => {
    const handlePersistedLogOut = (event) => {
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    window.addEventListener("storage", handlePersistedLogOut);

    return () => {
      window.removeEventListener("storage", handlePersistedLogOut);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        day,
        moveDate,
        handleFetchProtected,
        handleChildMisses,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isAppReady,
        isUserLogged,
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div className={style.centered}>
          <Circle />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
