import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'


import '../../styles/AuthSytles.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password });
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate("/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout title="Login - Ecommercer App" description="This is home of my Ecommerce website. there you can purchase any kind of thing usage of home, office, etc." author="Ravikant Suthar" keywords={"Login, Register, Ecommerce, Ecommerce Web, Ecommerce Website, Ecommerce Web App"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Login</h4>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Enter your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <button type="button" className="btn btn-primary" onClick={() => navigate('/forgot-password')}>Forgot Password</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
