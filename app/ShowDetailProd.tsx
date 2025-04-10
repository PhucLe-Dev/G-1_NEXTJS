"use client";
import { useState } from "react";
import { oneProd } from "./Components/cautrucdata";
import { useDispatch } from "react-redux";
import { ThemSP } from "./lib/cartSlice";
import SPLienQuan from "./sp/sanphamlienquan";

export default function ShowDetailProd({ sp }: { sp: oneProd }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity(quantity + 1);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        dispatch(ThemSP({ sp, quantity }));
        alert(`Đã thêm ${quantity} sản phẩm ${sp.ten_sp} vào giỏ hàng`);
    };

    return (
        <div>
            <div className="container mx-auto p-4 bg-white border border-[#dfdfdf]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img
                            className="w-full"
                            src={!sp.hinh ? "../pictureNotFound.png" : sp.hinh}
                            alt={sp.hinh}
                        />
                        <div className="flex space-x-2 mt-2">
                            <img
                                className="w-20 h-20 border border-[#dfdfdf] object-contain"
                                src={!sp.hinh ? "../pictureNotFound.png" : sp.hinh}
                                alt="notfound.png"
                            />
                            <img
                                className="w-20 h-20 border border-[#dfdfdf] object-contain"
                                src={!sp.hinh ? "../pictureNotFound.png" : sp.hinh}
                                alt="notfound.png"
                            />
                            <img
                                className="w-20 h-20 border border-[#dfdfdf] object-contain"
                                src={!sp.hinh ? "../pictureNotFound.png" : sp.hinh}
                                alt="notfound.png"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold break-words truncate-2-lines">
                            {!sp.ten_sp ? "Sản phẩm không xác định" : sp.ten_sp}
                        </h1>
                        <div className="flex text-base items-center space-x-2 mt-6">
                            <span className="text-yellow-500">★★★★☆</span>
                            <span className="text-gray-500">(5.9k đánh giá)</span>
                            <span className="text-gray-500">{sp.luot_xem} lượt xem</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-3">
                            <span className="text-[#fe6532] text-3xl font-bold">
                                {sp.gia_km ? sp.gia_km.toLocaleString("vi-VN") + "₫" : "Giá chưa xác định"}
                            </span>
                            <span className="text-gray-400 text-xl line-through">
                                {sp.gia ? sp.gia.toLocaleString("vi-VN") + "₫" : "Giá chưa xác định"}
                            </span>
                        </div>
                        <div className="mt-6">
                            <span className="text-gray-500 text-base">Màu sắc:</span>
                            <div className="flex space-x-2 mt-2 text-xs flex-wrap">
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    Đen Trơn
                                </button>
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    Trắng Trơn
                                </button>
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    Đen Gân
                                </button>
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    Trắng Gân
                                </button>
                            </div>
                        </div>
                        <div className="mt-6">
                            <span className="text-gray-500 text-base">Kích thước:</span>
                            <div className="flex space-x-2 mt-2 text-xs flex-wrap">
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    M 40-55kg
                                </button>
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    L 55-65kg
                                </button>
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    XL 65-75kg
                                </button>
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    XXL 75-88kg
                                </button>
                                <button className="border border-[#dfdfdf] px-4 py-2 mb-2 hover:border-[#fe6532]">
                                    XXL 75-88kg
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center space-x-4">
                            <span className="text-gray-500 text-base">Số Lượng: </span>
                            <div className="h-8 flex items-center border border-gray-300">
                                <button
                                    onClick={handleDecrease}
                                    className={`px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none ${quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={quantity === 1}   
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                    </svg>
                                </button>
                                <span className="px-4 py-1 text-base text-center border-x border-gray-300">{quantity}</span>
                                <button onClick={handleIncrease} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md focus:outline-none">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                </button>
                            </div>
                            <span className="text-gray-500 text-base">sản phẩm có sẵn: 12000</span>
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <button className="text-sm bg-[#fe6532] border border-[#fe6532] text-white px-12 py-3 hover:bg-white hover:text-[#333]">
                                Mua Ngay
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="flex items-center justify-center gap-2 text-sm text-[#fe6532] border border-[#fe6532] px-6 py-2 bg-[#FFEEE8] hover:bg-[#FFF5F1]"
                            >
                                <img
                                    alt="icon-add-to-cart"
                                    width="25px"
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/f600cbfffbe02cc144a1.svg"
                                />
                                Thêm Vào Giỏ Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <SPLienQuan id={sp.id} id_loai={sp.id_loai} />
        </div>
    );
}