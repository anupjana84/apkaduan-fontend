import React, {useState,useEffect} from 'react'
import { toast,ToastContainer  } from 'react-toastify';





import {Link } from 'react-router-dom'
import AdminDashboard from '../../layout/AdminDashboard';
import { API } from '../../../backend';



const AddOne=(props)=>{
    const myfo= React.createRef();
    const [values, setValues] = useState({
        name: "",
        description: "",
        stock: "",
        price:"",
        photo:"",
        category:"",
        categories:[],
        formdata:"",
        error: "",
        success: false,
        addProduct:""
      });
    
      const { name, description, stock,price,photo,category,categories, error, success,formdata,addProduct } = values;
    // const redir =()=>{
    //     setTimeout(() => {
    //        // console.log(props)
    //        props.history.push("/all/product")
    //     }, 2000);
        

    // }

      const getAllcategory=()=>{
        fetch(`${API}/admin/all/category`,{
            method:"get",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            if(data.error){
                setValues({
                    ...values,
                    error:data.error,
                    success:false
                })
            }else{
                setValues({
                    ...values,
                   
                    categories:data,
                    formdata:new FormData()
                })
              //  console.log(data)
               
            }
        })
        .catch(err=>{console.log(err)})
      }
      const errrorTosta=(error)=>{
        if(error){
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        
    }
      const successMessage=(data)=>{
        if(data){
        toast.success(`${data} Product Created Successfully`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        
    }
      const handelChange = name => e=>{
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        formdata.set(name,value)
        setValues({ ...values, [name]:value,error:""})
     // console.log(myfo.current.value) ; 
      }


      const formSubmit=(e)=>{
         const dataone={
             name:name,
             description:description,
             stock:stock,
             price:price,
         }
        e.preventDefault();
          setValues({ ...values, error: false });
          fetch(`${API}/create/product`,{
              method:"POST",
              headers:{
                  Accept:"application/json",
                 
              },
              body:formdata
          })
          .then(result=>{
           return result.json()
          })
          .then(data=>{
             if(data.error){
                setValues({ ...values, error: data.error, success:false });
                errrorTosta(data.error)
             }else{
               
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    stock: "",
                    price:"",
                    error: "",
                    photo:"",
                    success:true,
                    addProduct:data.name,
                    
                  });
                  successMessage(data.name)
                 
                 
                 console.log(myfo)

             }
            
          })
          .catch(err=>{
              console.log(err)
          })
      }



     useEffect(() => {
        getAllcategory()
     }, [])

    return (
        <AdminDashboard  title="Add Product">
      <ToastContainer limit={1}/>
      
     
        <form className="py-5"   onSubmit={formSubmit}>
        <div className="row">
            <div className="form-group col-md-6 offset-3">
                <label  className="">Category</label>
                <select type="text" 
                 className="form-control" 
                 placeholder="Enter Your Name"
                 onChange={handelChange('category')}

                 >
                    {categories && categories.map((cate,i)=>(
                        <option key={i} value={cate._id}>{cate.title}</option>
                    ))}
                 </select>
            </div>   
            <div className="form-group col-md-6 offset-3">
                <label  className="">Name</label>
                <input type="text" 
                 className="form-control" 
                 placeholder="Enter Your Name"
                 onChange={handelChange("name")}
                 name="name"
                 value={name}

                 />
            </div>   
            <div className="form-group col-md-6 offset-3">
                <label className="">description</label>
                <textarea type="text" 
                 className="form-control" 
                 placeholder="Enter Your description"
                 onChange={handelChange("description")}
                 name="description"
                 value={description}


                  />
            </div>   
            <div className="form-group col-md-6 offset-3">
                <label  className="">Price</label>
                <input type="number" 
                 className="form-control"
                 placeholder="Enter Your Price"
                 onChange={handelChange("price")}
                 name="price"
                 value={price} 
                 />
            </div> 
            <div className="form-group col-md-6 offset-3">
                <label  className="">Stock</label>
                <input type="text" 
                 className="form-control"
                 placeholder="Enter Your Stock"
                 onChange={handelChange("stock")}
                 name="stock"
                 value={stock} 
                 />
            </div>   
              
            <div className="form-group col-md-6 offset-3">
               <label htmlFor="photo">Photo<span style={{color:"red"}}>*</span></label>
               <input type="file" className="form-control-file" 
                name="photo"
                accept="image"
                onChange={handelChange("photo")}
                
               placeholder="Choose A File" />
            </div> 
            
            <div className="form-group d-flex  col-md-6 offset-3 justify-content-center">
                <button type="submit" className="btn btn-success">Add Product</button>
            </div>   
        </div>
    </form>
</AdminDashboard>
    )
}
export default AddOne;