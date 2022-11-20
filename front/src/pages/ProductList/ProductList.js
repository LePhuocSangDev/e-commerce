import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./productList.scss";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../features/productSlice";
import { getProduct } from "../../features/apiCall";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ProductList = ({ type }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cat = location.pathname.split("/")[2];
  const { products, isFetching } = useSelector(selectProduct);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [productsSearch, setProductsSearch] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [filters, setFilters] = useState({});
  const [price, setPrice] = useState([5, 10000000]);
  const [sort, setSort] = useState("");
  const [showCollection, setShowCollection] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showColor, setShowColor] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);
  console.log(productsSearch);
  useEffect(() => {
    if (search) {
      const searchResult = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setProductsSearch(searchResult);
    }

    setProductsFilter(
      products.filter(
        (item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value.toLowerCase())
          ) &&
          item.price >= price[0] &&
          item.price <= price[1]
      )
    );
  }, [search, filters, price, products]);
  useEffect(() => {
    if (cat) {
      const productsCat = products.filter((product) =>
        product.categories.toString().includes(cat)
      );
      setProductsFilter(productsCat);
    }
  }, [cat, products]);

  useEffect(() => {
    if (sort === "newest") {
      setProductsFilter((prev) =>
        [...prev].sort((a, b) => {
          var dateA = new Date(a.createdAt);
          var dateB = new Date(b.createdAt);
          return dateA - dateB;
        })
      );
    } else if (sort === "priceLow") {
      setProductsFilter((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setProductsFilter((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);
  const clearFilter = () => {
    setPrice([5, 10000000]);
    setSort("");
    setFilters({});
    setShowFilter(true);
  };
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="list">
          {type === "search" ? (
            <div className="search__input">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="What are you looking for?"
              />
              <button>
                <AiOutlineSearch />
              </button>
            </div>
          ) : (
            <div className="list__heading">
              <h2>Shop Our Collection</h2>
              <p>I'm a paragraph. Click here to add your own text.</p>
            </div>
          )}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="sort-products">
              <label htmlFor="sort">Sort by:</label>
              <select
                onChange={(e) => setSort(e.target.value)}
                id="sort"
                className="sort-products__select"
              >
                Sort by:
                <option value="newest">Newest</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="priceLow">Price: Low to High</option>
              </select>
            </div>

            <div className="list__container">
              {showFilter && (
                <div className="list__left">
                  <p className="list__filter">Filter by</p>
                  <div className="filter-type">
                    <p>
                      Category
                      <button
                        onClick={() => setShowCollection((prev) => !prev)}
                      >
                        {showCollection ? "-" : "+"}
                      </button>
                    </p>
                    {showCollection && (
                      <ul className="filter-type__list">
                        <li>All</li>
                        {["New", "Men", "Women", "Kid"].map((collection) => (
                          <Link
                            key={collection}
                            to={`/products/${collection.toLowerCase()}`}
                            href="/"
                          >
                            {collection}
                          </Link>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="filter-type">
                    <p>
                      Size{" "}
                      <button onClick={() => setShowSize((prev) => !prev)}>
                        {showSize ? "-" : "+"}
                      </button>
                    </p>
                    {showSize && (
                      <select
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            size: e.target.value,
                          }))
                        }
                        action=""
                        className="filter-type__size"
                      >
                        <option>X</option>
                        <option>S</option>
                        <option>Xl</option>
                        <option>M</option>
                        <option>L</option>
                      </select>
                    )}
                  </div>
                  <div className="filter-type">
                    <p>
                      Color{" "}
                      <button onClick={() => setShowColor((prev) => !prev)}>
                        {showColor ? "-" : "+"}
                      </button>
                    </p>
                    {showColor && (
                      <div className="filter-type__colors">
                        {[
                          "black",
                          "white",
                          "red",
                          "yellow",
                          "purple",
                          "blue",
                          "green",
                        ].map((color) => (
                          <label
                            key={color}
                            className="filter-type__colors-wrapper"
                          >
                            <input
                              type="radio"
                              name="color"
                              value={color}
                              id={color}
                              onChange={(e) => {
                                e.target.checked &&
                                  setFilters((prev) => ({
                                    ...prev,
                                    color: e.target.value,
                                  }));
                              }}
                            />
                            <span
                              className="checkmark"
                              style={{
                                backgroundColor: color,
                                border: `${
                                  color === "white" && "1px solid black"
                                }`,
                              }}
                            >
                              <span
                                className="checkmark-checked"
                                style={{
                                  color: `${
                                    color === "white" ? "black" : "white"
                                  }`,
                                }}
                              >
                                <AiOutlineCheck />
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="filter-type">
                    <p>
                      Price{" "}
                      <button onClick={() => setShowPrice((prev) => !prev)}>
                        {showPrice ? "-" : "+"}
                      </button>
                    </p>
                    {showPrice && (
                      <Box sx={{ width: "100%", position: "relative" }}>
                        <Slider
                          className="price-slider"
                          value={price}
                          min={0}
                          max={10000000}
                          onChange={(e) => setPrice(e.target.value)}
                          valueLabelDisplay="off"
                        />
                        <span className="price-min">
                          {price[0].toLocaleString("vi-VN")}đ
                        </span>
                        <span className="price-max">
                          {price[1].toLocaleString("vi-VN")}đ
                        </span>
                      </Box>
                    )}
                  </div>
                  {/* mobile */}
                  <div className="filter__mobile-button">
                    <button
                      onClick={() => setShowFilter(false)}
                      className="close-filter"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setShowFilter(false)}
                      className="apply-filter"
                    >
                      Apply
                    </button>
                    <button onClick={clearFilter} className="clear-filter">
                      Clear filter
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowFilter(true)}
                className="mobile__filter"
              >
                Filter
              </button>

              <div className="list__right">
                {search
                  ? productsSearch.map((product) => (
                      <ProductCard key={product.title} product={product} />
                    ))
                  : productsFilter.map((product) => (
                      <ProductCard key={product.title} product={product} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
