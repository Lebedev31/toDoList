import './DiscussionComponent.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import { useCreateCommentMutation } from '../../redux/slice/apiCommentsTaskSlice';

type PropsComment = {
    getTaskId: (num: number) => string;
    commentsArr: string[];
}

function CommentsComponent({getTaskId, commentsArr}: PropsComment){

    const [valueTextArea, setValueTextArea] = useState('');
    const [createComment , {error}] = useCreateCommentMutation();
    const baseUrl = 'http://localhost:8000/';

    function requestFormComment(e: React.FormEvent<HTMLFormElement>, num: number): void{
        e.preventDefault();
        const id = getTaskId(num);
        try {

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
              
                  {commentsArr.length !== 0 ? commentsArr.map((item, index)=> {
                      return (
                        <div key={index} className='comment_author'>
                            <Typography>{item}</Typography>
                        </div>
                        
                      )
                  }): null}

                    <form className='comment__form' onSubmit={(e)=> requestFormComment(e, 0)}>
                        <textarea value={valueTextArea} onChange={handleTextArea}></textarea>
                        <Button type='submit' variant="contained">Добавить комментарий</Button>
                    </form>

                </AccordionDetails>
        </Accordion>
    )
}

export default CommentsComponent;