import './Header.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header(){
    const location = useLocation();
    const mainTransition = location.pathname === '/personalArea' && '/discussion'? 'Назад к задачам' : 'Назад в меню авторизации';
    const mainTransitionPatch = location.pathname === '/personalArea' && '/discussion' ? '/main' : '/';

    console.log(mainTransitionPatch);

    return (
        <header className='header'>

            

            <div>

                <Link to={mainTransitionPatch}><button className="btn waves-effect waves-light" name="action">
                              {mainTransition}
                          </button>
                </Link> 
 
            </div>
            
             <h2 className='header__title'>To Do List</h2>

             <Link to='/personalArea' className='header__cabinet'>Личный кабинет</Link>
        </header>
    )
}

export default Header;