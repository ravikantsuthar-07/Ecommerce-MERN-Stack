import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
// import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'


const HomePage = () => {
    // const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data) {
                setCategories(data.category);
            }

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);


    // get all product
    const getAllProduct = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProduct(data.product)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };

    useEffect(() => {
        if (!checked.length && !radio.length) getAllProduct();
        //esline-disable-next-line
    }, [checked.length, radio.length]);

    // get Total Counts
    const getTotal = async () => {
        const { data } = await axios.get('/api/v1/product/product-count');
        setTotal(data?.total);
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page])
    // Load More
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            // let pro = products;
            // pro.apend(data.product)
            // console.log(pro);
            setProduct([...products, ...data.product]);
        } catch (error) {
            console.log(error);
        }
    }

    // Filter my cat
    const handleFilter = async (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all)
    };

    // get Filter Product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio })
            setProduct([])
            setProduct(data?.product)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    return (
        <Layout title="All Product - Best Offer" description="This is home of my Ecommerce website. there you can purchase any kind of thing usage of home, office, etc." author="Ravikant Suthar" keywords="Home, Ecommerce, Ecommerce Web, Ecommerce Website, Ecommerce Web App">
            <div className='row mt-3'>
                <div className='col-md-2'>
                    <h4 className='text-center'>Filter By CAtegory</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className='text-center'>Filter By Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className='d-flex flex-column'>
                        <button className='btn btn-danger' onClick={() => window.location.reload()}> RESET FILTER </button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products List</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map(p => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">₹{p.price}</p>
                                    <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button
                                        className="btn btn-secondary ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                            toast.success('Item Added to Cart');
                                        }}

                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button
                                className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPage(page + 1)
                                }}
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default HomePage
