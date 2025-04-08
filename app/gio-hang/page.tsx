"use client";
import Link from "next/link";
import { RootState } from "../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { ICart, oneProd } from "../Components/cautrucdata";
import { XoaGH, XoaSP, SuaSL } from "../lib/cartSlice";
import { useEffect, useState } from "react";
import ShowSP from "../Components/ShowSP";

export default function GioHang() {
    const cart_arr: ICart[] = useSelector((state: RootState) => state.cart.listSP);
    const total = cart_arr.reduce((total, item) => total + item.gia_tong, 0);
    const dispatch = useDispatch();
    const [spmoi, setSpmoi] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/spmoi/8`)
            .then(res => res.json())
            .then(data => setSpmoi(data))
            .catch(error => console.log("lỗi lấy sản phẩm mới:", error));
    }, []);

    const handleChangeQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1 && !confirm("Bạn có muốn xóa sản phẩm này không?")) return;
        if (newQuantity < 1) {
            dispatch(XoaSP(id));
        } else {
            dispatch(SuaSL([id, newQuantity]));
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
            dispatch(XoaSP(id));
        }
    };

    const handleClearCart = () => {
        if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng không?")) {
            dispatch(XoaGH());
        }
    };

    const renderEmptyCart = () => (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 text-center">
            <div className="py-10">
                <img
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f4.png"
                    alt="Empty Cart"
                    className="w-40 h-40 mx-auto"
                />
                <p className="text-lg text-gray-600 mt-4">Giỏ hàng của bạn đang trống</p>
                <Link
                    href="/"
                    className="mt-4 inline-block px-6 py-2 bg-[#fe6532] border border-[#fe6532] text-white text-base hover:bg-white hover:text-[#333]"
                >
                    Tiếp tục mua sắm
                </Link>
            </div>
            <div className="sphot">
                <div className="bg-[#ebebeb] p-2 my-6 text-base text-[#000] flex justify-between">
                    <h2 className="uppercase text-[#fe6532]">Sản phẩm mới</h2>
                    <Link href="" className="hover:text-[#fe6532]">Xem tất cả</Link>
                </div>
                <div className="grid grid-cols-4 gap-10">
                    {spmoi.map((sp: oneProd) => (
                        <ShowSP key={sp.id} sp={sp} />
                    ))}
                </div>
            </div>
        </div>
    );

    const renderCartWithItems = () => (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Giỏ hàng của bạn</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className="bg-[#dfdfdf]">
                        <tr className="flex text-base p-4">
                            <th className="flex-1 flex justify-start">Ảnh</th>
                            <th className="w-[450px] flex justify-start">Tên</th>
                            <th className="w-[150px] flex justify-center">Số lượng</th>
                            <th className="w-[200px] flex justify-center">Giá</th>
                            <th className="w-[100px] flex justify-end">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart_arr.map((cart) => (
                            <tr
                                key={cart.id}
                                className="flex p-4 border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                            >
                                <td className="flex-1 flex justify-start">
                                    <img src={cart.hinh} alt="Product" className="w-32 h-22" />
                                </td>
                                <td className="w-[450px] flex justify-start items-center">
                                    <Link href="" className="text-gray-800 text-base clamp-2">
                                        {cart.ten_sp}
                                    </Link>
                                </td>
                                <td className="w-[150px] flex justify-center items-center">
                                    <div className="h-8 flex items-center border border-gray-300">
                                        <button
                                            onClick={() => handleChangeQuantity(cart.id, cart.so_luong - 1)}
                                            className={`px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none}`}
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                            </svg>
                                        </button>
                                        <span className="px-4 py-1 text-base text-center border-x border-gray-300">{cart.so_luong}</span>
                                        <button
                                            onClick={() => handleChangeQuantity(cart.id, cart.so_luong + 1)}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md focus:outline-none"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="w-[200px] flex justify-center items-center">
                                    <span className="text-base">{cart.gia_tong.toLocaleString("vi-VN") + "₫"}</span>
                                </td>
                                <td className="w-[100px] flex justify-end items-center">
                                    <button
                                        onClick={() => handleDelete(cart.id)}
                                        className="text-base px-4 py-1 border text-gray-600 cursor-pointer hover:border-[#fe6532]"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="w-[150px] flex my-3">
                                <button
                                    onClick={handleClearCart}
                                    className="flex-1 text-base px-4 py-1 border text-gray-600 cursor-pointer hover:border-[#fe6532]"
                                >
                                    Xóa tất cả
                                </button>
                            </td>
                        </tr>
                        <div className="p-4 bg-[#dfdfdf] text-base flex justify-end">
                            Tổng đơn hàng: {total.toLocaleString("vi-VN") + "₫"}
                        </div>
                        <div className="float-right mt-3">
                            <Link
                                href="/thanh-toan"
                                className="w-50 px-4 py-2 bg-[#fe6532] border border-[#fe6532] text-xl text-white flex justify-center cursor-pointer hover:bg-[#fff] hover:text-gray-900"
                            >
                                Thanh toán
                            </Link>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    );

    return cart_arr.length === 0 ? renderEmptyCart() : renderCartWithItems();
}