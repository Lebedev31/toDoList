import './DiscussionComponent.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import { useCreateCommentMutation } from '../../redux/slice/apiCommentsTaskSlice';
import { Comment } from '../../redux/slice/typesData';
import { TaskCommentResponse } from '../../redux/slice/typesData';


type PropsComment = {
    idComment: string;
    commentsArr: Comment[];
    setDataArray: React.Dispatch<React.SetStateAction<TaskCommentResponse[]>>;
}

function CommentsComponent({idComment, commentsArr, setDataArray}: PropsComment){

    const [valueTextArea, setValueTextArea] = useState('');
    const [createComment , {error, data}] = useCreateCommentMutation();
    const baseUrl = 'http://localhost:8000/';

    useEffect(()=>{

        if(data){
           setDataArray(data.comments);
        }

    }, [data])

    function requestFormComment(e: React.FormEvent<HTMLFormElement>): void{
        e.preventDefault();
        try {
            const id = idComment;
          if(valueTextArea.length !== 0){
            createComment({id, comment: valueTextArea}).unwrap().catch((error)=>{ console.log(error)});
            setValueTextArea('');
          }
            
         } catch (error) {
             console.log(error);
         }
    }


    function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>): void{
        setValueTextArea(e.target.value);
    }
    return (
        <Accordion sx={{minHeight: '30px', marginTop: '10px'}}>
            <AccordionSummary  id="panel-header"
                               aria-controls="panel-content"
                               expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{textAlign: 'center'}}>Комментарии</Typography>
            </AccordionSummary>

            <AccordionDetails>
                {commentsArr?.length !== 0 && commentsArr !== undefined ? commentsArr.map((item, index)=> {
                   return item.commentsArr.map((item2, index)=>{
                        return (
                            <div key={index} className='comment_author'>
                                <p className='comment_name'>{item.name}</p>
                                <div className='comment_avatar'>
                                        <img src={`${baseUrl + item.avatar.slice(5)}`} alt="" />
                                </div>
                                <Typography sx={{width: '400px'}}>{item2}</Typography>
                                
                            </div>
                            

                        )
                    })
                    
                }): null}
                      
                  
                    <form className='comment__form' onSubmit={requestFormComment}>
                        <textarea value={valueTextArea} onChange={handleTextArea}></textarea>
                        <Button type='submit' variant="contained">Добавить комментарий</Button>
                    </form>

                </AccordionDetails>
        </Accordion>
    )
}

export default CommentsComponent;