
import React, { useState, useEffect, useContext } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import ProductZoom from "../../components/productZoom/ProductZoom";
import QtyBox from "../../components/QtyBox/QtyBox";
import Button from "@mui/material/Button";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import api from "../../api/axios";
import { MyContext } from "../../App";
import ProductReviews from "../ProductReviews/ProductReviews";

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(4);
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
      await api.post("/cart/add", { productId: product._id });
      context.openAlertBox("success", "Added to cart!");
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Failed to add");
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
      context.openAlertBox("error", err.response?.data?.message || "Failed");
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!product) return <p className="text-center py-20">Product not found.</p>;

  return (
    <>
      <div className="py-5">
        <div className="container text-white">
          <Breadcrumbs aria-label="breadcrumb" className="!text-white">
            <Link underline="hover" color="inherit" href="/" className="link transition">Home</Link>
            <Link underline="hover" color="inherit" href="/" className="link transition">Single Origin</Link>
            <Link underline="hover" color="inherit" href="/" className="link transition">{product.name}</Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-5">
        <div className="container flex gap-5">
          <div className="productZoomContainer w-[40%]">
            <img src={product.images}/>
          </div>

          <div className="productZoomContent w-[60%] pr-10 pl-10">
            <h1 className="text-[22px] font-bold mb-1">{product.name}</h1>

            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-[15px]">
                Origin: <span className="font-[500] text-black opacity-75">{product.origin}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Rating size="small" value={product.rating || 0} readOnly />
              <span className="text-[13px] cursor-pointer">Reviews (0)</span>
            </div>

            <div className="flex items-center justify-between mb-2 mt-3">
              <div className="flex gap-4">
                <h1 className="text-base sm:text-lg font-bold text-[#2c1a0e]">
                  ${product.price}
                </h1>
              </div>
            </div>

            <p className="dic mt-3 pr-10 mb-5">{product.description}</p>

            <div className="flex items-center">
              <h1 className="inline-block bg-amber-100 border border-amber-300 text-amber-800 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full mb-2 capitalize">
                {product.roastLevel} Roast
              </h1>
            </div>

            <div>
              <span className="text-[14px] font-bold">
                {product.countInStock > 0 ? (
                  <>Available In Stock: <span className="text-amber-800">{product.countInStock} Items</span></>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </span>
            </div>

            <p className="text-[16px] font-[400] mt-4 mb-2 text-[#000]">
              Free Shipping (Est. Delivery Time 2-3 Days)
            </p>

            {product.countInStock > 0 && (
              <div className="flex items-center gap-4">
                <div className="qtyBoxWrapper w-[70px]">
                  <QtyBox qty={qty} onChange={setQty} />
                </div>
                <Button
                  onClick={addToCart}
                  className="rounded-xl font-bold text-sm transition-all btn-org cursor-pointer"
                >
                  Add to Cart
                </Button>
              </div>
            )}

            <div className="flex items-center gap-4 mt-6">
              <span
                onClick={addToWishlist}
                className="flex items-center gap-3 text-[15px] link cursor-pointer font-[600]"
              >
                <IoMdHeartEmpty /> Add to Wishlist
              </span>
              <span className="flex items-center gap-3 text-[15px] link cursor-pointer font-[600]">
                <IoGitCompareOutline /> Add to Compare
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container pt-10">
          <div className="flex items-center gap-8">
            <span className="link text-[17px] cursor-pointer font-[500]" onClick={() => setActiveTab(0)}>Description</span>
            <span className="link text-[17px] cursor-pointer font-[500]" onClick={() => setActiveTab(1)}>Reviews</span>
          </div>

          {activeTab === 0 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 1 && (
            <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
              <ProductReviews productId={id} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;