import React, { lazy, Suspense, useEffect, memo } from 'react';
import { selectProduct } from '../features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../features/apiCall';
import { useMemo } from 'react';
import Loader from '../components/Loader/Loader';

const Slider = lazy(() => import('../components/Slider/Slider'));
const Widget = lazy(() => import('../components/Widget/Widgets'));
const ProductsRow = lazy(() => import('../components/ProductsRow/ProductsRow'));

const HomePage = memo(() => {
  const { products } = useSelector(selectProduct);
  const dispatch = useDispatch();
  const memoProducts = useMemo(() => products, [products]);
  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        padding: '16px 0',
        display: 'flex',
        gap: '16px',
        flexDirection: 'column',
      }}
    >
      <Suspense fallback={<Loader />}>
        <Slider />
        <Widget />
        <ProductsRow products={memoProducts} title="PHÂN LOẠI" type="category" />
        <ProductsRow products={memoProducts} title="GIÀY HOT NHẤT" />
        <ProductsRow products={memoProducts} title="GIÀY MỚI NHẤT" />
        <Widget size="sm" />
      </Suspense>
    </div>
  );
});

export default HomePage;
