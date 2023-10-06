import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PrivateRoute from './components/Routes/private';
import Dashboard from './pages/user/Dashboard';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/product/:slug' element={<ProductDetails />} />
                <Route exact path='/categories' element={<Categories />} />
                <Route exact path='/cart' element={<CartPage />} />
                <Route exact path='/category/:slug' element={<CategoryProduct />} />
                <Route exact path='/search' element={<Search />} />
                <Route exact path='/dashboard' element={<AdminRoute />}>
                    <Route path='admin' element={<AdminDashboard />} />
                    <Route path='admin/create-category' element={<CreateCategory />} />
                    <Route path='admin/create-product' element={<CreateProduct />} />
                    <Route path='admin/product/:slug' element={<UpdateProduct />} />
                    <Route path='admin/products' element={<Products />} />
                    <Route path='admin/users' element={<Users />} />
                    <Route path='admin/Orders' element={<AdminOrders />} />
                </Route>
                <Route exact path='/dashboard' element={<PrivateRoute />} >
                    <Route path='user' element={<Dashboard />} />
                    <Route path='user/orders' element={<Orders />} />
                    <Route path='user/profile' element={<Profile />} />
                </Route>
                <Route exact path='/about' element={<About />} />
                <Route exact path='/forgot-password' element={<ForgotPassword />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/policy' element={<Policy />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/*' element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
