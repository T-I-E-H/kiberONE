import { useContext } from "react";
import { Link} from "react-router-dom";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import logo from "../images/logo.jpg"

export default function Misses() {
  const { data, handleLogOut, handleChildMisses,handleFetchProtected } = useContext(AuthContext);
  return (
    <div className={style.wrapper}>
      <img src={logo}/>
      {/*data ? data.map((child,index) =>{
        return( 
        
        <Button onClick={handleChildMisses.bind(this,child.id)}>
            {child.name}
        </Button>
        
        )
      }) : "Вам пока что нечего отрабатывать"
    */}
    Солнечный
    <table>
    <tr><td>10:00</td><td ><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>11:00</td><td><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>12:00</td><td><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>13:00</td><td><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>14:00</td><td><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>15:00</td><td><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>16:00</td><td><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>17:00</td><td><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>18:00</td><td><Button>
        Выбрать
      </Button></td></tr>
      <tr><td>19:00</td><td><Button>
        Выбрать
      </Button></td></tr>
    </table>
    
      <Link onClick={handleFetchProtected} className={style.Link} to="../children">
      <Button>
        Назад
      </Button>
      </Link>
      <Link className={style.Link} to="../children">
      <Button>
        Время не подходит
      </Button>
      </Link>
      
    </div>
  );
}