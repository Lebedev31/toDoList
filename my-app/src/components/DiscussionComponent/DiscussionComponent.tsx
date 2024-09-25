import './DiscussionComponent.scss';
import Header from '../Header/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { styleAccordion } from './style';
import Button from '@mui/material/Button';
import CommentsComponent from './CommentsComponent';
import { useGetAllDiscussionQuery } from '../../redux/slice/apiCommentsTaskSlice';
import {useState, useEffect} from 'react';
import {TaskCommentResponse } from '../../redux/slice/typesData';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useCheckLikesMutation } from '../../redux/slice/apiCommentsTaskSlice';
import { useLocation } from 'react-router-dom';

function DiscussionComponent(){
    const [dataArray, setDataArray] = useState<TaskCommentResponse[]>([]);
    const {data, error, isLoading, refetch} = useGetAllDiscussionQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    function getTaskId(num: number): string{
        return dataArray[num]._id;
    }


    const location = window.location;
    console.log(location);

    const [commentsArr, setCommentsArr] = useState<string[]>([]);

    const [checkLikes, {data: likeUpdate, isLoading: loadingLike}] = useCheckLikesMutation();

    function requestLikes(str: string) {
        try {
           checkLikes(str).unwrap();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(dataArray && !isLoading){
            const comments = dataArray.flatMap(item => item.comments.flatMap(item2 => item2.commentsArr));
            setCommentsArr(comments);
        }
    }, [dataArray])
    

    useEffect(()=>{

        if(data){
            setDataArray(data.comments);
        }

    }, [data]);

    useEffect(()=>{
       if(likeUpdate && !loadingLike){
          setDataArray(likeUpdate.comments)
       }
    }, [likeUpdate])

    return(
        <>
          <Header/>
               <div className='discussion'>
                    <div className='discussion__panel'>
                            <Button variant='contained'>По популярности</Button>
                            <Button variant='contained'>Обсуждаемое</Button>
                    </div>

                    {dataArray.map((item, index)=>{
                   return (
                    <Accordion key={index}sx={styleAccordion} >
    
                    <AccordionSummary 
                                     id="panel-header"
                                     aria-controls="panel-content"
                                     expandIcon={<ExpandMoreIcon />}
                                     >
                       <Typography>Тема: {item.title} </Typography>
                    </AccordionSummary>
                    <AccordionDetails > 
                    <Typography>
                       <span className='discussion__description'>
                          {item.description}
                       </span>
                    </Typography>
                    <div style={{marginTop: '7px', display: 'flex', width: '10px',  gap: '10px'}}>
                            {item.like}: <ThumbUpIcon sx={{color: 'blue', marginTop: '-2px', cursor: 'pointer'}}
                                              onClick={()=> requestLikes(dataArray[index]._id)}/>
                    </div>

                    <CommentsComponent getTaskId={getTaskId} commentsArr={commentsArr}/>
                   
        
                   </AccordionDetails>
               </Accordion>
                   )
              })}
               </div>    
         
        </>
     
    )
}

export default DiscussionComponent;