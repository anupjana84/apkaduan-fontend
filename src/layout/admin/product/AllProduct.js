import React,{useState,useEffect,Fragment} from 'react'
import AdminDashboard from '../../layout/AdminDashboard';

import ImageRow from './ImageRow';
import { toast  } from 'react-toastify';
import Swal from 'sweetalert2'

const AllProduct =() =>{
    const [name, setName] = useState([]);


    const handeleDelete=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "DeLete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes Delete`
          }).then((result) => {
          // alert(result.value)
            if (result.value) {
                deleteProduct(id)
            }
          })
    }
    
const preLoad=()=>{
    allProduct();
}
const allProduct=()=>{
    fetch(`/api/all/product`,{
        method:"get",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    })
    .then(data=>{
        return data.json()
    })
    .then(result=>{
        setName(result)
       // console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}
const deleteProduct=(id)=>{
    fetch(`/api/deletepro/product/${id}`,{
        method:"delete",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    })
    .then(res=>res.json())
    .then(result=>{
       if(result.error){
        errorMessage(result.error)
       }else{
        successMessage(result.message)
       preLoad();
       }
      
    })
    .catch(err=>{console.log(err)})
}
const errorMessage=(data)=>{
    if(data){
    toast.success(`${data}`,{
        position: toast.POSITION.TOP_CENTER,
        progress: undefined,
      }, { autoClose: 5000 })
    }
    
}
const successMessage=(data)=>{
    if(data){
    toast.success(`${data}`,{
        position: toast.POSITION.TOP_CENTER,
        progress: undefined,
      }, { autoClose: 5000 })
    }
    
}

  useEffect(() => {
    preLoad();
  },[]);

    return (
        <AdminDashboard>
               <section className="content">
                <div className="container-fluid">
                    <div className="row">
                    <div className="form-group col-md-6 offset-3">
           
                <input type="search" 
                 className="form-control" 
                 placeholder="Search Your Product"
                

                 />
            </div> 
                    <div className="col-12">
                        <div className="card">
                        
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead className="text-center">
                                <tr className="text-center">
                                <th className="text-center"> SL NO.</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Description</th>
                                <th>price(s)</th>
                                <th> CATEGORY</th>
                                <th> EDIT PRODUCT</th>
                                <th> DELETE PRODUCT</th>
                                <th> Photo</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                           
                                  {
                                      name.map((product,i)=>{
                                    return(
                                        <Fragment key={i}>
                                       <ImageRow product={product} deleteProduct={handeleDelete} i={i}/>
                                     </Fragment>
                                    )
                                })}  
                                
                            </tbody>
                           
                            </table>
                        </div>
                        {/* /.card-body */}
                        </div>
                    </div>
                    {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>


            {/* <div className="row">
                <div className="col-sm-12 col-md-5">
                    <div className="dataTables_info" id="example2_info" role="status" aria-live="polite">
                        Showing 
                    </div>
                </div>
                <div className="col-sm-12 col-md-7">
                <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                    <ul className="pagination ml-auto">
                        <li className="paginate_button page-item previous disabled" id="example2_previous">
                            <span  aria-controls="example2"  className="page-link">Previous</span>
                        </li>
                        <li className="paginate_button page-item active">
                            <span  aria-controls="example2"  className="page-link">1</span>
                        </li>
                        <li className="paginate_button page-item ">
                            <span  aria-controls="example2"  className="page-link">2</span>
                        </li>
                        <li className="paginate_button page-item ">
                            <span  aria-controls="example2"  className="page-link">3</span>
                        </li>
                        <li className="paginate_button page-item "><span  aria-controls="example2" className="page-link">4</span></li>
                        <li className="paginate_button page-item "><span  aria-controls="example2"  className="page-link">5</span></li>
                        <li className="paginate_button page-item "><span  aria-controls="example2"  className="page-link">6</span></li>
                        <li className="paginate_button page-item next" id="example2_next">
                            <span  aria-controls="example2"  className="page-link">Next</span>
                        </li>
                    </ul>
                </div>
                </div>
            </div> */}

            
           
            
        </AdminDashboard>
    )
}
export default AllProduct;