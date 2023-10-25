import React from 'react'
import './RecommendedPage.css'
import React, { useContext, useEffect, useState } from "react";
import Item from "../miscellaneous/productCards/Item";
import axios from "axios";
import { apiURL } from "../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./categories";
import { DeleteFilled, FilterOutlined } from "@ant-design/icons";
import ProductsCardSkeleton from "../miscellaneous/productsCardSkeleton/productsCardSkeleton";
import FilterButtonModal from "../miscellaneous/modal/filterButtonModal";
import { productsContext } from "../../contexts/productsContext";

function RecommendedPage() {
    return (
        <>
            <div className="item-container">
                <div className="item-img-wrapper">
                    <img className="item-img" src={image} alt="" />
                    <div className="item-img-wishlist" onClick={() => isAuth ? toggleWishlist() : setLModal(true)}>
                        {wishlist ? (
                            spinnerLoading ? (
                                <ClockLoader
                                    color={"grey"}
                                    loading={true}
                                    size={20}
                                    speedMultiplier={5}
                                />
                            ) : (
                                <HeartFilled style={{ color: "#bf0b0b", fontSize: "1.8rem" }} />
                            )
                        ) : spinnerLoading ? (
                            <ClockLoader
                                color={"#21b94f"}
                                loading={true}
                                size={20}
                                speedMultiplier={5}
                            />
                        ) : (
                            <HeartFilled style={{ color: "grey", fontSize: "1.8rem" }} />
                        )}
                    </div>

                    <div className="item-img-product-info">
                        <div style={{ background: location === 'Inside LPU' ? '#ef7f1a' : '#ef2a1a' }} className="postedDate">{location}</div>
                        <div className="postedDate">{dateAgo} Days ago</div>
                    </div>
                </div>
                <div className="item-title-header-container">
                    <div className="item-title">{name}</div>
                    <div className="item-price">₹{price}</div>
                </div>
                <div className="item-description-container">
                    <div className="item-description">{description}</div>
                </div>
                <div className="item-date-and-category-container">
                    <div className="item-category">{category}</div>
                    <div className="item-postedby">Posted by</div>
                </div>
                <div className="item-Bottom-container">
                    <button
                        className="item-view-now-btn"
                        onClick={() => {
                            if (show) return
                            navigate("/viewproduct/" + productId);
                        }}
                    >
                        View details
                    </button>
                    <button
                        className="item-view-now-btn"
                        onClick={() => {
                            if (show) return
                            { isAuth ? toggleCart() : setLModal(true) }
                        }}
                    >
                        {isAdded ? <>In Cart</> : <>Add to cart</>}
                    </button>
                    <img
                        className="item-user-profile"
                        style={{
                            height: "2.2rem",
                            width: "2.2rem",
                            borderRadius: "100%",
                            border: "1px solid",
                        }}
                        src={`${userImage
                            ? userImage
                            : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`
                            }`}
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}

export default RecommendedPage
