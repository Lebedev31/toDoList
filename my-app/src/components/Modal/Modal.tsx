import './Modal.scss';
import { createPortal } from 'react-dom';
import { useState, useEffect} from 'react';
import useAnimation from '../../Hooks/useAnimation';
import InputDateComponent from './InputDateComponents';
import {useForm} from 'react-hook-form';
import { inputName} from './validations';
import { useCreateTaskMutation } from '../../redux/slice/apiUploadFile';
import { UploadCreateTask, CustomError } from '../../redux/slice/typesData';
import { useNavigate } from 'react-router-dom';
import { ResponseArrayTask } from '../../redux/slice/typesData';

export interface FormUpload {
    name: string,
}

interface ModalProps {
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    setDataTasks: React.Dispatch<React.SetStateAction<ResponseArrayTask[]>>;
}

function Modal({isModal, setIsModal, setDataTasks}: ModalProps){
  const categoryArray = ['Дом', 'Жизнь', 'Хобби', 'Спорт', 'Всякое', 'Важно'];
  const settingDate = ['Час', 'День', 'Месяц', 'Год'];
  const [colorCategoryButton, setColorCategoryButton] = useState('');
  const [areaText, setAreaText] = useState('');
  const [leapYear, setLeapYear] = useState(false);
  const [minYear, setMinYear] = useState(false);
  const [validationDate, setValidationDate] = useState(false);
  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormUpload>({mode: 'onSubmit'});
  const [inputDateCompletion, setInputDateCompletion] = useState<[...string[], boolean]>([false]); // функция для времени выполнения
  const [file, setFile] = useState<Blob>();
  const [createTask,  {error, data}] = useCreateTaskMutation();
  const {animation, setAnimation} = useAnimation(setIsModal);
  const fetchTypeErr = error as CustomError;
  const navigate = useNavigate();

  

   useEffect(()=>{
       if(data){
          setDataTasks(data.arrTask);
       }
   }, [data])

  function onSubmitUpload(data: FormUpload){
      const realInputDateComletion = inputDateCompletion.filter((item, _, arr)=> item !== arr[arr.length - 1] ) as string[];
      if(realInputDateComletion.includes('') && realInputDateComletion.find((item)=> item !== '')){
        setValidationDate(true);
         return;
      } 

      const now = new Date();
      const formattedDate = realInputDateComletion.join('.');
      const dateCompletion = new Date(parseInt(realInputDateComletion[3]), 
                               parseInt(realInputDateComletion[2]) - 1, 
                               parseInt(realInputDateComletion[1]),
                               parseInt(realInputDateComletion[0]));
    
    const formattedDateNow = `${now.getHours()}.${'0' + now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
      if(now > dateCompletion){
         setMinYear(true);
         return;
      }
       
      if(file){
         
        if(file.size > (8 * 1024 * 1024)){
            return;
        }
      }

      const formData  = new FormData();

      formData.append('now', formattedDateNow);
      formData.append('description', areaText );
      if(file){
      formData.append('image', file);
      }
      formData.append('colorCategoryButton', colorCategoryButton);
      formData.append('name', data.name);
      formData.append('dateCompletion', dateCompletion.toLocaleString());
      formData.append('check', inputDateCompletion[4].toString());

      

      try {

        const upload = createTask(formData).unwrap();
        if(data){
            setAnimation(' modalToDo-close');
        }
        
      } catch (error) {
          console.log(error);
      }
      
}

 function changeFile(e: React.ChangeEvent<HTMLInputElement> ){
      const files = e.target.files;
      if (files && files.length > 0) {
           setFile(files[0]);
      }
    
  }

  function changeAreaTask(e: React.ChangeEvent<HTMLTextAreaElement>){
      setAreaText(e.target.value)
  }
  
  useEffect(()=>{
    if(fetchTypeErr?.status === 401){
        navigate('/', { replace: true });
  }

  }, [error])
 

    return createPortal(
      
      <form className={`modalToDo${animation}`} onSubmit={handleSubmit(onSubmitUpload)}>
           <button 
                 onClick={()=> setAnimation(' modalToDo-close') }
                 className={`modalToDo__button ${animation}`}>
           </button>

           <div className='modalToDo__name'>

                   <input className='modalToDo__input' 
                          type="text" 
                          placeholder='Название задачи'
                          {...register('name', inputName)}
                          /> 
                       
                   <InputDateComponent settingDate={settingDate}
                                       setLeapYear={setLeapYear}
                                       setMinYear={setMinYear}
                                       setInputDateCompletion={setInputDateCompletion}
                                       setValidationDate={setValidationDate}/>
           </div>
           <div style={{height: '10px', fontSize: '10px', paddingLeft: '3px'}}>
                            {errors?.name && <span className='modalToDo__error'>{ String(errors.name.message) || 'Заполните графу'}</span>}
          </div>
           <div className='modalToDo__validation-inputDate'>
                    {minYear ? 'Прошлое должно быть в прошлом': ''} 
                    {leapYear ? '29 февраля только в высокостном году': ''}
                    {validationDate ? 'Уберите полностью дату или заполните до конца': ''}
            </div>
         
           <div className='modalToDo__category'>
                <h3 className='modalToDo__category_title'>Категория задачи</h3>
                <div className='modalToDo__list'>
                    {categoryArray.map((item, index, arr)=>{

                        if (item !== colorCategoryButton){
                            return (
                                <button type="button" key={index} onClick={()=>{setColorCategoryButton(arr[index])}}>{arr[index]}</button>
                             )
                        } 

                        return (
                            <button type="button" 
                                    key={index} style={{backgroundColor: 'red'}} 
                                    onClick={()=>{setColorCategoryButton(arr[index])}}>{arr[index]}</button>
                        )
                         
                    })}
                </div>
           </div>

           <div className='modalToDo__text'>
               <h3 className='modalToDo__category_title'>Суть задачи</h3>
               <textarea onChange={changeAreaTask}
                         value={areaText}
                         placeholder='Введите текст задачи'></textarea>
           </div>

           <div className='modalToDo__utils'>
                <h3 style={{marginTop: '5px'}} className='modalToDo__category_title'>Добавить фото или видео</h3>
                <input type="file" 
                       accept="image/*"
                       onChange={changeFile}
                     />
           </div>

           <button className="btn waves-effect waves-light" 
                   style={{margin: '25px auto', display: 'block', }}
                   >
                   Добавить задачу в список
          </button>          
         
      </form>,

      
      document.getElementById('modal') as HTMLElement


   )

  
}

export default Modal;