import './ToDo.scss';
import Modal from '../Modal/Modal';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ResponseArrayTask } from '../../redux/slice/typesData';
import { useGetAllTasksQuery, useDeleteTaskMutation } from '../../redux/slice/apiUploadFile';
import { CustomError } from '../../redux/slice/typesData';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



function ToDo(){

    const [isModal, setIsModal] = useState(false);
    const [dataTasks, setDataTasks] = useState<ResponseArrayTask[]>([]);
    const {data: tasks, error, refetch, isLoading} = useGetAllTasksQuery();
    const fetchTypeErr = error as CustomError;
    const [deleteTask, {data: newTaskDelete, error: newError}] = useDeleteTaskMutation();
    const baseUrl = 'http://localhost:8000/'; // URL вашего бэкенд-сервера
    

    useEffect(()=>{
        if(newTaskDelete?.arrTask){
            setDataTasks(newTaskDelete.arrTask);
        }
    
    }, [newTaskDelete]);


    useEffect(()=>{
        if(tasks?.arrTask){
            refetch();
            setDataTasks(tasks.arrTask);
        }
    }, [tasks]);

    return (
        <div className='todo'>
            
            {isModal ? <Modal setIsModal={setIsModal} setDataTasks={setDataTasks} isModal={isModal}/>: null}
            
            <div className='todo__buttonBlock'>
                          <button onClick={()=>{setIsModal(true)}} className="btn waves-effect waves-light">
                              Добавить задачу
                          </button>

                        <Link to='/discussion'>

                            <button className="btn waves-effect waves-light">
                                Обсудить задачи
                            </button>
                        
                        </Link>  
             </div>

             <Paper elevation={5} className='todo__task'>

                {
                    dataTasks.map((item, index)=>{
                       return(

                        <Accordion key={index} className='todo__accordion'>
                          <AccordionSummary id="panel-header" aria-controls="panel-content">
                             <div style={{display: 'flex', alignItems: 'center'}}> 
                                   
                                   <h2  className='todo__tast__title'>Название задачи: {item.nameTask}</h2>
                                   <p className='todo__dateCreation'>Дата создания: {item.dataOfCreation}</p>
                                   <p className='todo__category'>Категория: {item.categoryTask === ''? 'Общее': item.categoryTask} </p>
                                   <button 
                                           className='todo__button'
                                           onClick={(e)=> {
                                            e.stopPropagation();
                                            deleteTask(item._id).unwrap()}}>   
                                    </button>
                             
                             </div>
                             
                          </AccordionSummary>
                         <AccordionDetails> 
                            
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                               {item.imgTaskPath === ''? null: <img style={{width: '100px', height: '100px'}} 
                                                                    src={`${baseUrl}${item.imgTaskPath.replace('\\', '/').slice(5)}`}
                                                                    alt= "картинка"/> } 
                             <p style={{width: '200px'}}>{item.dateOfCompletion !== 'Invalid Date'? `Дата напоминания ${item.dateOfCompletion}`: ''}</p>  
                             <p style={{width: '350px'}}>{item.contentTask}</p> 
                            </div>
                            <Button style={{margin: '0 auto', display: 'block'}} variant="outlined">Редактировать задачу</Button>
                            <Button style={{margin: '10px auto', display: 'block'}} variant="outlined">Отправить задачу на обсуждение</Button>
                            
                             
                        </AccordionDetails>
                     </Accordion>

                       )
                    })
                }
                
     
                 
            </Paper>
        </div>
    )
}

export default ToDo;