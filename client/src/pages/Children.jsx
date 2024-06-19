import { useContext } from "react";
import { Link} from "react-router-dom";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import logo from "../images/logo.jpg"

export default function Childs() {
  const { data, handleLogOut, handleChildMisses } = useContext(AuthContext);
  return (
    <div className={style.wrapper}>
      <img src={logo}/>
      {data ? data.map((child,index) =>{
        return( 
        <Link key={index} className={style.Link} to="misses">
        <Button onClick={handleChildMisses.bind(this,child.id)}>
            {child.name}
        </Button>
        </Link>
        )
      }) : null
      }
      <Link to="../demo" className={style.Link}>
      <Button>
        Назад
      </Button>
      </Link>
    </div>
  );
}