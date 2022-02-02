import React from 'react'

import { Link } from 'react-router-dom'

import ImageHelper from '../../../core/ImageHelper';


const ImageRow=({product,i,deleteProduct})=> {
  // console.log(product)

    return (
      
        
        <tr key={i}>
            <td className="text-center py-0"> {i+1}</td>
            <td className="text-center py-0"> {product.name}</td>
            <td className="text-center py-0"> {product.description}</td>
            <td className="text-center py-0"> {product.price}</td>
            {product.cattegory.title &&  <td className="text-center py-0"> {product.cattegory.title}</td>}
           
            <td className="text-center" style={{color:"green"}}> 
                <Link className="btn btn-info" to={`/edit/product/${product._id}`} >
                    <i className="nav-icon fas fa-edit" />
                </Link>
            </td>
            <td className="text-center" style={{color:"red"}}>
                <button className="btn btn-danger" onClick={()=>{deleteProduct(product._id)}}>
                    <i className="nav-icon fas fa-trash" /></button> 
            </td>
            <td className="py-0" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <ImageHelper product={product.photo}/></td>
            </tr>
    )
}
export default ImageRow;