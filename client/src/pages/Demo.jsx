import { useContext } from "react";
import { Link} from "react-router-dom";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import logo from "../images/logo.jpg"

export default function Demo() {
  const { data, handleLogOut, handleFetchProtected } = useContext(AuthContext);
  
  return (
    <div className={style.wrapper}>
      <img src={logo} />
      <Link to="../children" className={style.Link}>
      <Button onClick={handleFetchProtected}>
        Дети
      </Button>
      </Link>
      <Link to="" className={style.Link}>
      <Button onClick={handleLogOut}>
        Выйти
      </Button>
      </Link>
    </div>
  );
}
