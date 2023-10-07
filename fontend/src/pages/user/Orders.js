import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment'

const Orders = () => {
    const [order, setOrder] = useState([]);
    const [auth] = useAuth();

    // get All Orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/orders', {
                headers: {
                    "Authorization": auth.token
                }
            });
            setOrder(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])
    return (
        <Layout title={'Your Orders - Ecommerce App'}>
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Orders</h1>
                        {order?.map((o, i) => {
                            return (

                                <div className='border shadow' key={i}>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Buyer</th>
                                                <th scope='col'>Order Date</th>
                                                <th scope='col'>Payment</th>
                                                <th scope='col'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                            <div className='cotainer'>
                                                {o?.products.map((p, i) => (
                                                    <div className='row m-2 p-3 card flex-row' key={i}>
                                                        <div className='col-md-4'>
                                                            <img
                                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                                className="card-img-top"
                                                                alt={p.name}
                                                                width={"100px"}
                                                                height={"100px"}
                                                            />

                                                        </div>
                                                        <div className='col-md-8'>
                                                            <p>{p.name}</p>
                                                            <p>{p.description.substring(0, 30)}</p>
                                                            <p>Price : {p.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
