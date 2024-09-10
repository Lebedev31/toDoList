import './Registration.scss';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {inputLogin, inputUserName, inputPassword} from './validations'; 
import { useAddUserMutation } from '../../redux/slice/apiUserSlise';
import { FormValue, CustomError } from '../../redux/slice/typesData';




function Registration(){
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormValue>({mode: 'onBlur'});
    const [addUser, {isLoading, error, data}] = useAddUserMutation();

 function onSubmitUserRegistration(data: FormValue){
     const user = addUser(data).unwrap()
                                .then(() => reset() )
                                .catch((err)=> console.log(err));
     
     
}   const fetchTypeErr = error as CustomError;
    const loading = isLoading ? <p className='registration__loading'>Идет запрос...</p>: '';
    const err = fetchTypeErr ? <p className='registration__error2'>{fetchTypeErr?.data.error}</p>: '';
    const result = data ? <p className='registration__success'>Регистрация завершена успешно, перейдите на страницу авторизации</p>: ''


    return(
       <form onSubmit={handleSubmit(onSubmitUserRegistration)} className='registration'>
           <h2>Регистрация</h2>

           
                 <label className='active' 
                        htmlFor="first_name2">Email</label>
                 <input 
                        type="text" 
                        className= 'validate'
                        placeholder='Создайте логин'
                        {...register('login', inputLogin)}/>
                        <div style={{height: '25px'}}>
                            {errors?.login && <span className='registration__error'>{ String(errors.login.message) || 'Ошибка'}</span>}
                        </div>
                 
                 <label className='active'
                        htmlFor="first_name2">Имя</label>
                 <input 
                        type="text" 
                        className= 'validate'
                        placeholder='Введите свое имя'
                        {...register('name', inputUserName)}/>
                        <div style={{height: '25px'}}>
                            {errors?.name && <span className='registration__error'>{ String(errors.name.message) || 'Ошибка'}</span>}
                        </div>

                 <label className='active'
                        htmlFor="first_name2">Пароль</label>
                 <input 
                        type="text" 
                        className= 'validate'
                        placeholder='Создайте свой пароль'
                        {...register('password', inputPassword)}/>
                        <div style={{height: '25px'}}>
                            {errors?.password && <span className='registration__error'>{ String(errors.password.message) || 'Ошибка'}</span>}
                        </div>
           
           
           <div className='registration__btn-block'>

            <Link to='/'><button className="btn waves-effect waves-light" name="action">
                           Назад
                </button>
            </Link> 


            <button className="btn waves-effect waves-light" type="submit" name="action">
                           Завершить регистрацию
            </button>

           </div>

           <div className='registration__result'>
               {loading}
               {err}
               {result}
           </div>
           
        

       </form>
    )
}


export default Registration;
