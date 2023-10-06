import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'


const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // Total Price
    const totalPrice = () => {
        try {
            let total = 0;
            cart.map(item => (total = total + item.price ))
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            });
        } catch (error) {
            console.log(error)
        }
    };

    // Delete item 
    const removeCartItem = (pid) => {
        try {
            console.log(pid);
            let myCart = [...cart];
            function checkitem(item) {
                return item._id === pid;
            }
            let index = myCart.findIndex(checkitem);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };
    // get payment gatway token
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    // Handle Payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product/braintree/payment', {
                nonce, cart
            },
            {
                headers: {
                    "Authorization": auth.token
                }
            });
            console.log(data);
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Payment Complete Successfully')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };
    return (
        <Layout title={"Cart Page"}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0
                                ? `You have ${cart?.length} item in your cart ${auth?.token ? "" : "Please Login to Checkout"}`
                                : "Your Cart is Empty"}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {
                            cart?.map(p => (
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
                                        <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='col-md-4'>
                        <h4>Cart Summary</h4>
                        <p>Checkout | Payment | Total</p>
                        <hr />
                        <h4>Total: {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className='mb-3'>
                                {auth?.token ? (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')} >Update Address</button>
                                ) : (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/login', {
                                        state: "/cart"
                                    })} >
                                        Please Login To Checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div className='mt-2'>
                            {
                                !clientToken || !cart?.length ? ("") : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button
                                            className='btn btn-primary'
                                            onClick={handlePayment}>
                                            {loading ? 'Processing....' : 'Make Payment'}
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default CartPage
