
import './Modal.scss';
import { useState, useEffect} from 'react';

interface PropsInputDateComponent{
    settingDate: string[];
    setLeapYear: React.Dispatch<React.SetStateAction<boolean>>
    setMinYear: React.Dispatch<React.SetStateAction<boolean>>
    setInputDateCompletion: React.Dispatch<React.SetStateAction<[...string[], boolean]>>
    setValidationDate: React.Dispatch<React.SetStateAction<boolean>>
}

function InputDateComponent({settingDate, setLeapYear, setMinYear, setInputDateCompletion, setValidationDate}: PropsInputDateComponent){

    const[hourInput, setHourInput] = useState(''); // состояние для инпута часов
    const[dayInput, setDayInput] = useState(''); // состояние для инпута дней
    const[mouthInput, setMouthInput] = useState('');// состояние для инпута месяцев
    const[yearInput, setYearInput] = useState('');// состояние для инпута лет
    const[chek, setChek] = useState(false);// состояние для инпута чекбокса
   

   useEffect(()=>{
    setInputDateCompletion([hourInput, dayInput, mouthInput, yearInput, chek]);

   },[hourInput, dayInput, mouthInput, yearInput, chek]);

    const correctionNumber = (num: number, min: number, max: number) => {
        if (isNaN(num) || num < min || num > max) return '';
        return num;
      };

    function setHourCompletion(e: React.ChangeEvent<HTMLInputElement>){
        const valueNum = correctionNumber(parseInt(e.target.value), 1, 24);
        setValidationDate(false);
        if(typeof valueNum === 'number' && valueNum.toString().length <= 2 ){
            return setHourInput(valueNum.toString());
            
        } else{
          return setHourInput('');
          
        }
    }

    const setDayCompletion = (e:React.ChangeEvent<HTMLInputElement>) => {
        const valueNum = correctionNumber(parseInt(e.target.value), 1, 31);
        setValidationDate(false);
           if(typeof valueNum === 'number' && valueNum.toString().length <= 2){
             
            if(mouthInput === ''){
                return setDayInput(valueNum.toString());
            }

            if(mouthInput === '2' && valueNum <= 29  && (yearInput === '' || parseInt(yearInput) % 4 === 0)){
                setLeapYear(false);
                return setDayInput(valueNum.toString());
            } 

            if(['4', '6', '9', '11'].includes(mouthInput) && valueNum < 31){
               return setDayInput(valueNum.toString());
            }

            if(['1', '3', '5', '7', '8', '10', '12'].includes(mouthInput) && valueNum < 32){
                return setDayInput(valueNum.toString());
             }
 
           
         } else {
            return setDayInput(valueNum.toString());
         }
       
      };
    
      const setMouthCompletion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueNum = correctionNumber(parseInt(e.target.value), 1, 12);
        setValidationDate(false);
        if(typeof valueNum === 'number' && valueNum.toString().length <= 2){
            
            if(dayInput === ''){
                return setMouthInput(valueNum.toString());
            }

            if(parseInt(dayInput) < 32 && ['1', '3', '5', '7', '8', '10', '12'].includes(valueNum.toString())){
                 return setMouthInput(valueNum.toString());
            }

            if(parseInt(dayInput) < 30 && valueNum === 2){
                return setMouthInput(valueNum.toString());
            }

            if(parseInt(dayInput) < 31 && ['4', '6', '9', '11'].includes(valueNum.toString())){
                return setMouthInput(valueNum.toString());
            }

        } else{
           return setMouthInput(valueNum.toString());
        }
      };
    
      const setYearCompletion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueNum = correctionNumber(parseInt(e.target.value), 2, 3000);
        setValidationDate(false);
        if(typeof valueNum === 'number' && valueNum.toString().length <= 4){

            if(valueNum.toString().length === 4 && valueNum < 2024){
                setMinYear(true);
                return setYearInput('');
            }

            if(parseInt(dayInput) === 29 && valueNum.toString().length === 4 && valueNum % 4 !== 0){
                setLeapYear(true);
                return setYearInput('');
            } 

            if(parseInt(dayInput) !== 29){
                setMinYear(false);
                setLeapYear(false);
                return setYearInput(valueNum.toString());
            }

            if(dayInput === ''){
                return setYearInput(valueNum.toString());
             }
             setMinYear(false);
            setLeapYear(false);
            return setYearInput(valueNum.toString());

        } else{
            return setYearInput(valueNum.toString());
        }
      }; 
     
    return (
        <>
        <div style={{width: '347px', display: 'flex', justifyContent: 'space-between'}}>
        {settingDate.map((item, index, arr)=>{

            if(item === 'Час'){

                return (
                    <input key={index}
                           onChange={setHourCompletion}
                           value={hourInput}
                           className='modalToDo__input'
                           type="number" 
                           placeholder={arr[index]} 
                           style={{width: '67px'}}
                           />
                  )

            }

            if(item === 'День'){
                return(
                    <input key={index}
                    value={dayInput}
                    className='modalToDo__input'
                    type="number" 
                    placeholder={arr[index]} 
                    style={{width: '67px'}}
                    onChange={setDayCompletion}
                 
                   />
                )
            }

            if(item === 'Месяц'){
                return(
                    <input key={index}
                    value={mouthInput}
                    className='modalToDo__input'
                    type="number" 
                    placeholder={arr[index]} 
                    style={{width: '67px'}}
                    onChange={setMouthCompletion}
                   
                    
                   />
                )
            }

            if (item === 'Год') {
                return (
                  <input
                    key={index}
                    value={yearInput}
                    className='modalToDo__input'
                    type='number'
                    placeholder={arr[index]}
                    style={{ width: '67px' }}
                    onChange={setYearCompletion}
                   
                  />
                );
              }
           
        })}
         <p style={{fontSize: '9px', lineHeight: '4px'}}>Напомнить?</p>
         <input style={{width: '20px', height: '20px', display: 'block', opacity: '1', position: 'static', pointerEvents: 'auto'}} 
                type="checkbox"  onChange={()=> setChek(!chek)}/>
         
     </div>
        </>
        
    )
}

export default InputDateComponent;