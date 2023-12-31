import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([]);

    // get all product
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            if (data?.success) {
                toast.success(data?.message);
                setProducts(data.product)
            }
        } catch (error) {
            console.log(error);
            toast.error('Somting went wrong');
        }
    }

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-8'>
                    <h1 className='text-center'>All Products List</h1>
                    <div className='d-flex'>
                        {products?.map((p, i) => (
                            <Link to={`/dashboard/admin/product/${p.slug}`} className='product-link' key={i}>
                                <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
