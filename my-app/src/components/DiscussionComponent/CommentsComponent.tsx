import './DiscussionComponent.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CommentsComponent(){
    return (
        <Accordion sx={{minHeight: '30px', marginTop: '10px'}}>
            <AccordionSummary  id="panel-header"
                               aria-controls="panel-content"
                               expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{textAlign: 'center'}}>Комментарии</Typography>
            </AccordionSummary>

            <AccordionDetails>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Laborum vitae quasi soluta porro. Veritatis exercitationem cum, 
                    maxime itaque doloremque labore dignissimos consequatur odio. Recusandae,
                     fugiat deserunt ipsam explicabo consequuntur quas?
                </AccordionDetails>
        </Accordion>
    )
}

export default CommentsComponent;