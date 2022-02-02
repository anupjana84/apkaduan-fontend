import React, { useState, useEffect } from 'react'
//import { createProduct } from '../../helper/adminhelper'
import AdminDashboard from '../../layout/AdminDashboard'
import { toast } from 'react-toastify'
import { css } from '@emotion/core'
import BeatLoader from 'react-spinners/BeatLoader'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const AddProduct = () => {
  // const filein= React.createRef();
  // const [cate, setCate]=useEffect([])
  const [name, setName] = useState('')
  const [isloder, setLoder] = useState(false)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])
  const [category, setcCategory] = useState('')

  const loder = () => {
    return (
      // <div className="d-flex justify-content-center my-5">
      //                 <div className="spinner-border text-light" role="status">
      //                     <span className="sr-only text-white">Loading...</span>
      //                 </div>
      //                 <h3 className="text-white ml-3">
      //                 Saving....</h3>
      //                 </div>
      <div
        className="sweet-loading"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BeatLoader
          css={override}
          size={40}
          color={'#123abc'}
          loading={isloder}
        />
        <h3 tyle={{ color: 'red' }}>Saving....</h3>
      </div>
    )
  }

  const [url, setUrl] = useState('')

  const errrorMessage = (error) => {
    if (error) {
      toast.warning(
        `${error}`,
        {
          position: toast.POSITION.TOP_CENTER,
        },
        { autoClose: 3000 },
      )
    }
  }

  const successMessage = (data) => {
    if (data) {
      toast.warning(
        `${data}`,
        {
          position: toast.POSITION.TOP_CENTER,
        },
        { autoClose: 3000 },
      )
    }
  }

  //getCategory
  const getAllCate = () => {
    fetch(`/api/admin/all/category`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //input change

  const handelSubmit = (e) => {
    // console.log(image.type )
    e.preventDefault()
    console.log(image)
    if (!name || !description || !price || !stock || !image || !category) {
      return errrorMessage('ALL Field Are Required')
    }
    if (image.size > 1048576) {
      return errrorMessage('Can Not Upload Image More Than 1MB')
    }

    if (image.type === 'application/pdf') {
      return errrorMessage('Not Upload Pdf File')
    } else {
      setLoder(true)
      //console.log(object)
      const data = new FormData()
      data.append('file', image)
      data.append('upload_preset', 'ecom_node')
      data.append('cloud_name', 'dpxnlpmbk')
      // console.log(image)

      fetch(`https://api.cloudinary.com/v1_1/dpxnlpmbk/image/upload`, {
        method: 'POST',
        body: data,
      })
        .then((res) => {
          return res.json()
        })
        .then((result) => {
          if (result.error) {
            errrorMessage('Attach A File')
          } else {
            setUrl(result.url)
          }

          // console.log(resule)

          //console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    if (url) {
      fetch(`/api/create/product`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
          category,
          photo: url,
        }),
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error)
            errrorMessage(data.error)
          } else {
            setLoder(false)
            setName('')
            setPrice('')
            setDescription('')
            setImage('')
            setStock('')
            successMessage(data.message)
          }
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getAllCate()
  }, [url])

  const addForm = () => (
    <div className="col-md-6 offset-3 ">
      <form>
        <div className="form-group">
          <label htmlFor="name">
            Name<span style={{ color: 'red' }}>*</span>{' '}
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your name"
          />
        </div>
        <div className="form-group">
          <label>
            Description<span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            type="text"
            className="form-control"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Enter Your Description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">
            Price<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Enter Your Price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">
            Stock<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            placeholder="Enter Your Stock"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">
            Photo<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => {
              setImage(e.target.files[0])
            }}
            placeholder="Choose A File"
          />
        </div>
        <div className="form-group ">
          <label htmlFor="inputState">
            Category<span style={{ color: 'red' }}>*</span>
          </label>
          <select
            id="inputState"
            className="form-control"
            onChange={(e) => setcCategory(e.target.value)}
          >
            <option>Select</option>
            {categories &&
              categories.map((cate, i) => {
                return (
                  <option key={i} value={cate._id}>
                    {cate.title}
                  </option>
                )
              })}
          </select>
        </div>
        <div className="form-group d-flex  col-md-6 offset-3 justify-content-center">
          <button
            type="submit"
            onClick={handelSubmit}
            className="btn btn-success"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  )

  return (
    <AdminDashboard title="Add Product">
      {isloder ? loder() : addForm()}
    </AdminDashboard>
  )
}
export default AddProduct
