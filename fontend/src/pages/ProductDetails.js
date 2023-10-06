import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    // Inital Product Details 
    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    }, [])
    // get Product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            similarProduct(data?.product._id, data.product.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    // similar product
    const similarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProduct(data?.product);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout title={"Product Detail"}>
            <div className='container'>
                <div className='row  mt-2'>
                    <div className='col-md-6'>
                        <img
                            src={`/api/v1/product/product-photo/${product?._id}`}
                            className="card-img-top"
                            alt={product.name}
                        />
                    </div>
                    <div className='col-md-6'>
                        <h1 className='text-center'>Product Detail</h1>
                        <h6>Name: {product.name}</h6>
                        <h6>Description: {product.description}</h6>
                        <h6>Price: {product.price}</h6>
                        <h6>Category: {product?.category?.name}</h6>
                        <button className="btn btn-secondary ms-1">ADD TO CART</button>
                    </div>
                </div>
                <div className='row'>
                    <h1>Similar product</h1>
                    <div className='d-flex flex-wrap'>
                        {relatedProduct?.map(p => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">₹{p.price}</p>
                                    <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
