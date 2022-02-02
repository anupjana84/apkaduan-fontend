import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'


import AdminDashboard from '../../layout/AdminDashboard';
import { isAutheticated } from '../../../auth/helper';
import { errorMessage,successMessage } from '../../../utility';




const EditCategory = ({match}) => {
    const catId=match.params.catId;
    const history=useHistory()



    // console.log(catId)
    const [values, setValues]=useState({
        title:"",
        description:"",
        error:false,
        success:false
    });
    const {title,description,error,success}=values
    const {user , token}=isAutheticated();


    const getCategory=()=>{
        fetch(`/api/admin/edit/category/${catId}/${user._id}`,{
            method:"get",
            headers:{
                Accept:"application/json",
                "Content-type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            if(data.error){
                setValues({
                    error:true
                })
            }else{
                setValues({
                    title:data.message.title,
                    description:data.message.description
                })  
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    
    useEffect(() => {
        getCategory();
    }, [])
    

    const  handelChange=(e)=>{
        setValues({
            ...values,
        [e.target.name]:e.target.value

        })
    }
    const   editSubmit=(e)=>{
        e.preventDefault();
        setValues({
            ...values,

        })
        const data={
            title:title,
            description:description
        }
       // console.log(data)
     
        fetch(`/api/admin/update/category/${catId}/${user._id}`,{
            method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(data)


        })
        .then(result=>{
            return result.json()
        })
        .then(data=>{
          if(data.error){
              setValues({
                ...values,
                error:data.error,
                success:false
              })
              errorMessage(data.error)
          }else{
            setValues({
                ...values,
                title:"",
                description:"",
                error:false,
                success:true
            })
            successMessage("Category Updated Successfull")
            history.push("/all/category")
          }
        }

        )
        .catch(err=>{
            console.log(err)
        })
    }
    const EditForm=()=>(
        <div className="col-md-6 offset-3 ">
                             
        <form onSubmit={editSubmit}>
            <div className="form-group">
               <label htmlFor="name">Title </label>
               <input type="text" className="form-control" 
               name="title"
               onChange={e=>handelChange(e)}
               value={title}
                placeholder="Enter Your Title" />
            </div>
            <div className="form-group">
               <label htmlFor="description">Description</label>
               <input type="text" className="form-control" 
               name="description"
               onChange={e=>handelChange(e)}
               value={description}
               placeholder="Enter Your Description" />
            </div>
            <div className="form-group d-flex  col-md-6 offset-3 justify-content-center">
                <button type="submit" className="btn btn-success">Edit category</button>
            </div>  
         </form>

      </div>
    )
    
    return (
       <AdminDashboard title="Edit Category ">
      
        {EditForm()}
        
                          
        </AdminDashboard>
    );
}

export default EditCategory;