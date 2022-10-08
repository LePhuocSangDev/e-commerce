import React, { useEffect, useState } from "react";
import Slider from "../components/Slider/Slider";
import Widget from "../components/Widget/Widgets";
import ProductsRow from "../components/ProductsRow/ProductsRow";
import { publicRequest } from "../axios";
import ScrollToTop from "../components/ScrollToTop";
import { selectProduct } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/apiCall";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const { products, isFetching } = useSelector(selectProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div>
          <ScrollToTop />
          <Slider />
          <Widget />
          <ProductsRow products={products} title="PHÂN LOẠI" type="category" />
          <ProductsRow products={products} title="GIÀY HOT NHẤT" />
          <ProductsRow products={products} title="GIÀY MỚI NHẤT" />
          <Widget size="sm" />
        </div>
      )}
    </>
  );
};

export default HomePage;
