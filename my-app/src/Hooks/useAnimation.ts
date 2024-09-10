import { useState, useEffect } from 'react';

function useAnimation(setIsModal: React.Dispatch<React.SetStateAction<boolean>>){
    const [animation, setAnimation] = useState(''); 

    useEffect(()=>{
        setAnimation(' modalToDo-show');
    }, []);

    useEffect(()=>{
        if(animation === ' modalToDo-close'){
            const timeoutId =  setTimeout(()=>{
               setIsModal(false);
           }, 500);

          return ()=>{
             clearTimeout(timeoutId);
          }
        }
    }, [animation]);

    return{ animation, setAnimation}
}

export default useAnimation;