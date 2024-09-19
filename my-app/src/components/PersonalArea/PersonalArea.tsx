import './PersonalArea.scss';
import Header from '../Header/Header';
import {useRef, useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import { useCreatePersonalDataMutation, useGetAllDataQuery, useUploadAvatarPersonalDataMutation} from '../../redux/slice/apiPersonalArea';


function PersonalArea(){
    const[file, setFile] = useState<Blob>()
    const inputFileRef = useRef<HTMLInputElement>(null);
    const ARRPERSONALDATA = ['Имя', 'Фамилия', 'Ник', 'Email'];
    const [indexElement, setIndexElement] = useState<number | null>(null);
    const [checkRegister, setChekRegister] = useState(true);
    const [indexInputRegister, setIndexInputRegister] = useState<(number | null)[]>([null, null, null, null]);
    const [createPersonalData, {data}] = useCreatePersonalDataMutation();
    const [valueTextField, setValueTextField] = useState('');
    const [responseData, setResponseData] = useState<string[]>();
    const {isLoading, error: getError, data: getData, refetch} = useGetAllDataQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const [uploadAvatarPersonalData] = useUploadAvatarPersonalDataMutation();
    const baseUrl = 'http://localhost:8000/';



    useEffect(()=>{
       if(file){
          const formData = new FormData;
          formData.append('image', file);
          uploadAvatarPersonalData(formData).unwrap()
          .then(()=> {

            refetch();
          })
          .catch(()=>{
             console.log('Произошла ошибочка');
          });

       }
    }, [file]);


    useEffect(()=>{
         
        if(!isLoading && getData !== undefined){
            setResponseData(Object.values(getData.personalArea));
         }

    }, [getData]);


    useEffect(()=>{

        if(data !== undefined){
             setResponseData(Object.values(data.personalArea));
             setIndexElement(null);
             console.log(data.personalArea);
        }

    }, [data]);

    function getSetIndexInputRegister(num: number){
         setIndexInputRegister(prev =>{
            const newArr = [...prev];
            newArr[num] = num;
            return newArr;
         })
    }

    useEffect(()=>{

        if(responseData){

            if(responseData[0] !== ''){
                getSetIndexInputRegister(0);
            }

            if(responseData[1] !== ''){
                getSetIndexInputRegister(1);
            }
            
            if(responseData[2] !== ''){
                getSetIndexInputRegister(2);
            }

            if(responseData[3] !== ''){
                getSetIndexInputRegister(3);
            }

        }
    }, [responseData]);

    

   function handleChangeTextField (e: React.ChangeEvent<HTMLInputElement>){
       setValueTextField(e.target.value);
   }

  async function requestPersonalData (item: string){
         try {
            await createPersonalData({[item]: valueTextField}).unwrap();
         
         } catch (error) {
            console.log(error)
         }
        
   }

    function inputClick(){
       inputFileRef.current?.click();
    }

    function fileChange(e: React.ChangeEvent<HTMLInputElement>){
        const files = e.target.files;
        if (files && files.length > 0) {
             setFile(files[0]);
        }
    }

    const chekTextField = (index: number, indexElement: number | null, arr: string[], item: string) => {
        
        return (
            <>
            <TextField value={valueTextField} 
                       sx={{display:  index === indexElement ? 'block' : 'none', background: 'white'}}  
                       label={arr[index]} variant="outlined" 
                       onChange={handleChangeTextField}/>
             <button onClick={()=> {
                setIndexInputRegister(prev => {
                     const newArr = [...prev];
                     newArr[index] = index;
                     return newArr;
                });
                setChekRegister(true);
                requestPersonalData(item);
            }}
                   style={{display:  index === indexElement ? 'block' : 'none', cursor: 'pointer'}}>✓</button>
        
            </> 

        )
    }

    return(
        <div>
            <Header/>
            <div className='personalArea__container'>
                <div className='personalArea__avatar'
                     onClick={inputClick}>
                    <p className='personalArea__textUploadAvatar'>Загрузить изображения</p>
                    {responseData !== undefined && responseData[4] !== ''? 
                            <img className='personalArea__img' src={`${baseUrl + responseData[4].slice(5)}`} />: null}
                    <input 
                          style={{display: 'none'}} 
                          type="file" 
                          ref={inputFileRef}
                          onChange={fileChange}
                          />
                </div>

                <div className='personalArea__info'>

                    {ARRPERSONALDATA.map((item, index, arr)=>{
                        return (
                            <div key={index} className='personalArea__item'>
                                <IconButton 
                                          onClick={()=>{setIndexElement(index); setChekRegister(false);}}
                                          color="info" 
                                          sx={{width: '25px', height:'25px' }} 
                                          aria-label="add">
                                      <AddIcon/>
                                 </IconButton>
                                { 
                                 
                              (checkRegister === true || index !== indexElement) && indexInputRegister[index] === index ? 
                                                            <div>{responseData ? responseData[index]: null
                                                            }</div>: chekTextField(index, indexElement, arr, item)
                                }  
                            </div>
                        )
                    })}

               
                </div>
            </div>
        </div>
    )
}

export default PersonalArea;