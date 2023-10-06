import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'


const Profile = () => {
    // Context
    const [auth, setAuth] = useAuth();
    // useState
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // get User Details
    useEffect(() => {
        const { email, name, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])
    // Handler
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.put('/api/v1/auth/profile', 
                {
                    name,
                    email,
                    phone,
                    address
                }, 
                {
                    headers: {
                        "Authorization": auth.token
                    }
                });
            if (data?.error){
                toast.error(data?.error)
            }else {
                setAuth({...auth, user:data.updatedUser})
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={"Your Profile - Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9"><div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <h4 className='title'>USER PROFILE</h4>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder='Enter your Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder='Enter your Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                    
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPhone1"
                                    placeholder='Enter your Phone'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputAddress1"
                                    placeholder='Enter your Address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">UPDATE</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
