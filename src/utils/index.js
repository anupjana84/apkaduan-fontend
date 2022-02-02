import {toast } from 'react-toastify';
 
 
 
 export const errorMessage=(error)=>{
    if(error){
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        

}
 export const successMessage=(message)=>{
    if(message){
        toast.success(`${message}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        

}