import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const params = useParams()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (params?.slug) getProductByCatory()
    }, [params])
    const getProductByCatory = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params?.slug}`);
            setProducts(data?.product);
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <h3 className='text-center'>{categories?.name}</h3>
            <h6 className='text-center'>{products?.length} result found</h6>
            <div className='d-flex flex-wrap'>
                {products?.map(p => (
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

        </Layout>
    )
}

export default CategoryProduct
