import './Main.scss';
import Header from '../Header/Header';
import ToDo from '../ToDo/ToDo';
import { Outlet } from 'react-router-dom';


function Main(){


    return(
        <div className='main'>
             <Header/>
             <ToDo/>
         

        </div>
    )
}

export default Main;