import React, { useEffect, useState } from "react";
import Slider from "../components/Slider/Slider";
import Widget from "../components/Widget/Widgets";
import ProductsRow from "../components/ProductsRow/ProductsRow";
import { selectProduct } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/apiCall";

const HomePage = () => {
  const { products, isFetching } = useSelector(selectProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Slider />
      <Widget />
      <ProductsRow products={products} title="PHÂN LOẠI" type="category" />
      <ProductsRow products={products} title="GIÀY HOT NHẤT" />
      <ProductsRow products={products} title="GIÀY MỚI NHẤT" />
      <Widget size="sm" />
    </div>
  );
};

export default HomePage;
