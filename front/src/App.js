import React from "react";
import { useSelector } from "react-redux";
import "./app.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import CartPage from "./pages/CartPage/CartPage";
import "./globalStyle/darkMode.scss";
import "./globalStyle/responsive.scss";
import { selectTheme } from "./features/themeSlice";
import { selectUser } from "./features/userSlice";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import AdminHome from "./admin/adminPage/AdminHome";
import AdminUsers from "./admin/adminPage/AdminUsers";
import AdminCreateProduct from "./admin/adminPage/AdminCreateProduct";
import AdminUpdateProduct from "./admin/adminPage/AdminUpdateProduct";
import AdminProducts from "./admin/adminPage/AdminProducts";
import AdminOrders from "./admin/adminPage/AdminOrders";

import AdminLayout from "./layout/AdminLayout";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const theme = useSelector(selectTheme);
  const { userInfo } = useSelector(selectUser);
  return (
    <div className={`app ${theme === "dark" ? "dark" : ""} responsive`}>
      {
        <>
          <Routes>
            <Route
              path="/login"
              element={
                userInfo ? (
                  <Navigate to="/" replace />
                ) : (
                  <LoginPage type="Login" />
                )
              }
            />
            <Route
              path="/register"
              element={
                userInfo ? (
                  <Navigate to="/" replace />
                ) : (
                  <RegisterPage type="Register" />
                )
              }
            />
            <Route path="*" element={<NotFound />} />

            <Route element={<AdminLayout />}>
              <Route path="admin" element={<AdminHome />} />
              <Route index path="admin/products" element={<AdminProducts />} />
              <Route
                path="admin/product/create"
                element={<AdminCreateProduct />}
              />
              <Route
                path="admin/product/update/:id"
                element={<AdminUpdateProduct />}
              />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/orders" element={<AdminOrders />} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route
                path="/search"
                element={<ProductList type="search" />}
              ></Route>
              <Route path="/products/:cat" element={<ProductList />}></Route>
              <Route path="/product/:id" element={<Product />}></Route>
              <Route
                path="/checkout"
                element={<CheckoutPage type="step1" />}
              ></Route>
              <Route
                path="/checkout/step2"
                element={<CheckoutPage type="step2" />}
              ></Route>
              <Route
                path="/checkout/step3"
                element={<CheckoutPage type="step3" />}
              ></Route>
            </Route>
          </Routes>
        </>
      }
    </div>
  );
}

export default App;
