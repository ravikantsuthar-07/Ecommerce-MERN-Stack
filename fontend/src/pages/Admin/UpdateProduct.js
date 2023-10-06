import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd'
import { useAuth } from '../../context/auth.js'


const { Option } = Select


const UpdateProduct = () => {
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("")
    const [auth] = useAuth()

    //get single product
    const getsingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setCategory(data.product.category._id);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setId(data.product._id);
        } catch (error) {
            console.log(error);
            toast.error('Someting went wrong')
        }
    }

    useEffect(() => {
        getsingleProduct();
        //eslint-disable-next-line
    }, []);


    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data) {
                setCategories(data.category);
            }

        } catch (error) {
            console.log(error);
            toast.error('Somethings went worng in getting category')
        }

    };

    useEffect(() => {
        getAllCategory();
    }, [])

    const navigate = useNavigate();
    // create product functions
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            const { data } = await axios.put(`/api/v1/product/update-product/${id}`,
                productData,
                {
                    headers: {
                        "Authorization": auth.token
                    }
                });
            if (data?.success) {
                toast.success(data.message);
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Somting went wrong');
        }
    }

    // delete product 
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/v1/product/delete-product/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/dashboard/admin/products/')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    return (
        <Layout title={'Create Product - Admin Panel'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className='m-1 w-75'>
                            <div className='mb-3'>
                                <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => setCategory(value)} value={category}>
                                    {categories?.map(c => (
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))}
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='upload images' className='btn btn-outline-secondary col-md-12'>
                                    {/* {photo ? photo.name : "Upload Photo"} */}
                                    <input type='file' className='form-control btn btn-outline-secondary' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)} alt='product_photo' height={'200px'} className='img img-responsive' />
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img src={`/api/v1/product/product-photo/${id}`} alt='product_photo' height={'200px'} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={name} placeholder='Write a Name' className='form-control' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <textarea value={description} placeholder='Write the description' className='form-control' onChange={(e) => setDescription(e.target.value)} ></textarea>
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={price} placeholder='Write the Price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={quantity} placeholder='Write the Quantites' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => setShipping(value)} value={shipping ? "Yes" : "No"}>
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleUpdate} >UPDATE PRODUCT</button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDelete} >DELETE PRODUCT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
