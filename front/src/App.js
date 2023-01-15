import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import './app.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import './globalStyle/darkMode.scss';
import './globalStyle/responsive.scss';
import { selectTheme } from './features/themeSlice';
import { selectUser } from './features/userSlice';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import AdminLayout from './layout/AdminLayout';
import NotFound from './components/NotFound/NotFound';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductList = lazy(() => import('./pages/ProductList/ProductList'));
const Product = lazy(() => import('./pages/Product/Product'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/LoginPage/RegisterPage'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));

const AdminHomePage = lazy(() => import('./admin/adminPage/AdminHome'));
const AdminUsers = lazy(() => import('./admin/adminPage/AdminUsers'));
const AdminCreateProduct = lazy(() => import('./admin/adminPage/AdminCreateProduct'));
const AdminUpdateProduct = lazy(() => import('./admin/adminPage/AdminUpdateProduct'));
const AdminProducts = lazy(() => import('./admin/adminPage/AdminProducts'));
const AdminOrders = lazy(() => import('./admin/adminPage/AdminOrders'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));

function App() {
  const theme = useSelector(selectTheme);
  const { userInfo } = useSelector(selectUser);
  return (
    <div className={`app ${theme === 'dark' ? 'dark' : ''} responsive`}>
      {
        <>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/login"
                element={userInfo ? <Navigate to="/" replace /> : <LoginPage type="Login" />}
              />
              <Route
                path="/register"
                element={userInfo ? <Navigate to="/" replace /> : <RegisterPage type="Register" />}
              />
              <Route path="*" element={<NotFound />} />

              <Route element={<AdminLayout />}>
                <Route path="admin" element={<AdminHomePage />} />
                <Route index path="admin/products" element={<AdminProducts />} />
                <Route path="admin/product/create" element={<AdminCreateProduct />} />
                <Route path="admin/product/update/:id" element={<AdminUpdateProduct />} />
                <Route path="admin/users" element={<AdminUsers />} />
                <Route path="admin/orders" element={<AdminOrders />} />
              </Route>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/search" element={<ProductList type="search" />}></Route>
                <Route path="/products/:cat" element={<ProductList />}></Route>
                <Route path="/products" element={<ProductList />}></Route>
                <Route path="/product/:id" element={<Product />}></Route>
                <Route path="/checkout" element={<CheckoutPage type="step1" />}></Route>
                <Route path="/checkout/step2" element={<CheckoutPage type="step2" />}></Route>
                <Route path="/checkout/step3" element={<CheckoutPage type="step3" />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
              </Route>
            </Routes>
          </Suspense>
        </>
      }
    </div>
  );
}

export default App;
