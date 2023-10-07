import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FcShop } from 'react-icons/fc'
import { useAuth } from '../../context/auth'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'

export default function Header() {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const category = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><FcShop /> Ecommerce App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>


                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={"/category"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={`/categories`}>All Categories</Link></li>
                                    {category?.map((c, i) => (
                                        <li key={i}><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                                    ))}
                                </ul>

                            </li>

                            {!auth.user ?
                                (<>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                </>) :
                                (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" >Dashboard</NavLink></li>
                                            <li>
                                                <NavLink onClick={handleLogout} className="dropdown-item" to="/login">logout</NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>)
                            }
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                    <NavLink className="nav-link" to="/cart">Cart </NavLink>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
