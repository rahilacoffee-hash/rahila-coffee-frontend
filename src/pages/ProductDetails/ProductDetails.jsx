import React, { useState, useEffect, useContext } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import QtyBox from "../../components/QtyBox/QtyBox";
import Button from "@mui/material/Button";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import api from "../../api/axios";
import { MyContext } from "../../App";
import ProductReviews from "../ProductReviews/ProductReviews";

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/product/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!context.isLogin) {
      context.openAlertBox("error", "Please login first");
      return;
    }

    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: qty,
      });

      context.openAlertBox("success", "Added to cart!");
    } catch (err) {
      context.openAlertBox(
        "error",
        err.response?.data?.message || "Failed to add"
      );
    }
  };

  const addToWishlist = async () => {
    if (!context.isLogin) {
      context.openAlertBox("error", "Please login first");
      return;
    }

    try {
      await api.post("/mylist/add", {
        productId: product._id,
        productTitle: product.name,
        image: product.images?.[0],
        rating: product.rating,
        price: product.price,
      });

      context.openAlertBox("success", "Added to wishlist!");
    } catch (err) {
      context.openAlertBox(
        "error",
        err.response?.data?.message || "Failed"
      );
    }
  };

  if (loading)
    return <p className="text-center py-20">Loading...</p>;

  if (!product)
    return <p className="text-center py-20">Product not found.</p>;

  return (
    <>
      {/* Breadcrumb */}
      <div className="py-5 bg-[#2c1a0e]">
        <div className="container text-white">
          <Breadcrumbs className="!text-white">
            <Link to="/" className="link">Home</Link>
            <Link to="/" className="link">Products</Link>
            <span>{product.name}</span>
          </Breadcrumbs>
        </div>
      </div>

      {/* MAIN */}
      <section className="bg-white py-5">
        <div className="container flex flex-col lg:flex-row gap-6">

          {/* IMAGE */}
          <div className="w-full lg:w-[40%]">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* DETAILS */}
          <div className="w-full lg:w-[60%]">

            <h1 className="text-[18px] sm:text-[22px] font-bold mb-2">
              {product.name}
            </h1>

            <p className="text-gray-500 text-sm">
              Origin: <span className="text-black">{product.origin}</span>
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Rating size="small" value={product.rating || 0} readOnly />
              <span className="text-xs">(0 reviews)</span>
            </div>

            <h2 className="text-xl font-bold text-[#2c1a0e] mt-3">
              ${product.price}
            </h2>

            <p className="mt-3 text-sm">
              {product.description}
            </p>

            <span className="inline-block mt-3 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
              {product.roastLevel} Roast
            </span>

            <p className="mt-3 text-sm font-semibold">
              {product.countInStock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.countInStock})
                </span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>

            {/* CART */}
            {product.countInStock > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 mt-4">

                <div className="w-[90px]">
                  <QtyBox qty={qty} onChange={setQty} />
                </div>

                <Button
                  onClick={addToCart}
                  className="btn-org w-full sm:w-auto"
                >
                  Add to Cart
                </Button>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-5 text-sm font-semibold">

              <span
                onClick={addToWishlist}
                className="flex items-center gap-2 cursor-pointer"
              >
                <IoMdHeartEmpty /> Wishlist
              </span>

              <span className="flex items-center gap-2 cursor-pointer">
                <IoGitCompareOutline /> Compare
              </span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="container mt-10">

          <div className="flex gap-6 border-b pb-2">
            <span
              onClick={() => setActiveTab(0)}
              className={`cursor-pointer ${
                activeTab === 0 ? "font-bold" : ""
              }`}
            >
              Description
            </span>

            <span
              onClick={() => setActiveTab(1)}
              className={`cursor-pointer ${
                activeTab === 1 ? "font-bold" : ""
              }`}
            >
              Reviews
            </span>
          </div>

          {activeTab === 0 && (
            <div className="mt-4 p-4 shadow rounded">
              {product.description}
            </div>
          )}

          {activeTab === 1 && (
            <div className="mt-4 p-4 shadow rounded">
              <ProductReviews productId={id} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;