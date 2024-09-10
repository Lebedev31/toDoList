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

function DiscussionComponent(){

    const arr = [1, 2 , 3];
    return(
        <>
          <Header/>
               <div className='discussion'>
                    <div className='discussion__panel'>
                            <Button variant='contained'>По популярности</Button>
                            <Button variant='contained'>Обсуждаемое</Button>
                    </div>

                    {arr.map((item, index)=>{
                   return (
                    <Accordion key={index}sx={styleAccordion} >
    
                    <AccordionSummary 
                                     id="panel-header"
                                     aria-controls="panel-content"
                                     expandIcon={<ExpandMoreIcon />}
                                     >
                       <Typography>Тема: </Typography>
                    </AccordionSummary>
                    <AccordionDetails > 
                    <Typography>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi earum adipisci mollitia 
                        provident similique. Aspernatur explicabo nulla pariatur iusto recusandae, 
                        dolore fugiat est porro quam obcaecati odio numquam, nemo quaerat?</Typography>
                        <CommentsComponent/>
        
                   </AccordionDetails>
               </Accordion>
                   )
              })}
               </div>    
         
        </>
     
    )
}

export default DiscussionComponent;