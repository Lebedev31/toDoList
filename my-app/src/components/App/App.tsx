import './App.scss';
import Authorization from '../Authorization/Authorization';
import {Routes, Route, useLocation} from 'react-router-dom';
import Registration from '../Registration/Registration';
import Main from '../Main/Main';
import PersonalArea from '../PersonalArea/PersonalArea';
import DiscussionComponent from '../DiscussionComponent/DiscussionComponent';


function App(){

    const location = useLocation();
   
    return (
        <div className='container'>
            { location.pathname === '/main' || '/personalArea' ? '' : <h1 className='app__header'>Организуй свои дела по порядку!</h1>}
            <main>
                 <Routes>
                    <Route path='/' element={<Authorization/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/main' element={<Main/>}/>
                    <Route path='/personalArea' element={<PersonalArea/>}/>
                    <Route path='/discussion' element={<DiscussionComponent/>}/>
                 </Routes>

                
            </main>
        </div>
    )
}

export default App;