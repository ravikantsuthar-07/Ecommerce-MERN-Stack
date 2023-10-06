import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [value] = useSearch();
    return (
        <Layout title={"Search Result"}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>
                        {value?.results.product.length < 1 ? 'No Product Found' : `Found ${value.results.product.length}`}
                    </h6>
                    <div className='d-flex flex-wrap mt-4'>
                        {value?.results?.product.map(p => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">₹{p.price}</p>
                                    <button className="btn btn-primary ">More Details</button>
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

export default Search
