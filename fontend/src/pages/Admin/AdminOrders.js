import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment'
import { Select } from 'antd';
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState(['Not Process', 'Processing', 'Shipping', 'Deliverd', 'Cancel']);
    const [changeStatus, setChangeStatus] = useState("")
    const [order, setOrder] = useState([]);
    const [auth] = useAuth();

    // get All Orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/all-orders', {
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

    const handleChange = async (orderId, value) => {
        const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
            status: value,
        }, {
            headers: {
                "Authorization": auth.token
            }
        });
        getOrders();
    }
    return (
        <Layout title={"All Orders - Admin Dashboard"}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Orders</h1>
                    {order?.map((o, i) => {
                        return (

                            <div className='border shadow'>
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
                                            <td>
                                                <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>{s}</Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createAt).fromNow()}</td>
                                            <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                        <div className='cotainer'>
                                            {o?.products.map(p => (
                                                <div className='row m-2 p-3 card flex-row'>
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
        </Layout>
    )
}

export default AdminOrders