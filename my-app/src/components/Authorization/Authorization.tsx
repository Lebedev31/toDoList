import './Authorization.scss';
import 'materialize-css/dist/css/materialize.min.css';
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { AuthValue, CustomError } from '../../redux/slice/typesData';
import { useAuthUserMutation } from '../../redux/slice/apiUserSlise';
import {inputLogin, inputPassword} from '../Registration/validations';
import { useEffect } from 'react';

function Authorization(){

    const {register, handleSubmit, formState: {errors}} = useForm<AuthValue>({mode: 'onBlur'});
    const [authUser, {isLoading, error, data}] = useAuthUserMutation();
    const navigate = useNavigate();

    async function onSubmitAuth(data : AuthValue){
       
      try {
         
         const result = await authUser(data).unwrap();
            
       } catch (error) {
          console.log(error);
       }
      }

     
      useEffect(()=>{
        
       if(data){
           localStorage.setItem('key', data.token);
           navigate('/main');
        }
     }, [data]);

     const fetchTypeErr = error as CustomError;
     const loading = isLoading ? <p className='avtorization__loading'>Идет запрос...</p>: '';
     const err = fetchTypeErr ? <p className='autorization__error2'>{fetchTypeErr?.data.error}</p>: '';
 
    return (
      
      <form className='authorization' onSubmit={handleSubmit(onSubmitAuth)}>

                 <label className='active authorization__labelText'
                        htmlFor="first_name2">Войти</label>
                 <input 
                        type="text" 
                        className= 'validate'
                        placeholder='Введите логин'
                        {...register('login', inputLogin)}/>
                   <div style={{height: '25px'}}>
                            {errors?.login && <span className='authorization__error'>{ String(errors.login.message) || 'Ошибка'}</span>}
                  </div>      

                  <input  
                        type="text" 
                        className= 'validate'
                        placeholder='Введите пароль'
                        {...register('password', inputPassword)}/>
                   <div style={{height: '25px'}}>
                            {errors?.password && <span className='authorization__error'>{ String(errors.password.message) || 'Ошибка'}</span>}
                  </div>
                  

            <p className='autorization__link'>Нет учетной записи? <Link to='/registration'>Создайте её!</Link></p>
            <a href="#">Не удается получить доступ к своей учетной записи?</a>
            

            <button className="btn waves-effect waves-light" type="submit" name="action">
                           Далее 
            </button>

            <div className='authorization__result'>
                 {loading}
                 {err}
            </div>
            
      </form>
          
      
    )
}

export default Authorization