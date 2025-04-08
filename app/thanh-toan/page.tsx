"use client";
import { RootState } from "../lib/store";
import { useRef } from "react";
import { ICart } from "../Components/cautrucdata";
import { useSelector, useDispatch } from "react-redux";
import { XoaGH } from "../lib/cartSlice";

export default function ThanhToan() {
    const listSP: ICart[] = useSelector((state: RootState) => state.cart.listSP);
    const total = listSP.reduce((sum, item) => sum + item.gia_tong, 0); // Dùng gia_tong
    const dispatch = useDispatch();

    const hotenRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const sdtRef = useRef<HTMLInputElement>(null);
    const diachiRef = useRef<HTMLInputElement>(null);
    const ghichuRef = useRef<HTMLTextAreaElement>(null);
    const thongbaoRef = useRef<HTMLDivElement>(null);

    const submitDuLieu = () => {
        const ht = hotenRef.current?.value;
        const email = emailRef.current?.value;
        const sdt = sdtRef.current?.value;
        const diachi = diachiRef.current?.value;
        const ghichu = ghichuRef.current?.value;

        if (ht?.trim() == "") {
            thongbaoRef.current!.innerHTML = "Chưa nhập họ tên";
            hotenRef.current!.style.backgroundColor = "#fe6532";
            hotenRef.current!.focus();
            return;
        } else hotenRef.current!.style.backgroundColor = "white";

        if (email?.trim() == "") {
            thongbaoRef.current!.innerHTML = "Chưa nhập email";
            emailRef.current!.style.backgroundColor = "#fe6532";
            emailRef.current!.focus();
            return;
        } else emailRef.current!.style.backgroundColor = "white";

        if (diachi?.trim() == "") {
            thongbaoRef.current!.innerHTML = "Chưa nhập địa chỉ";
            diachiRef.current!.style.backgroundColor = "#fe6532";
            diachiRef.current!.focus();
            return;
        } else diachiRef.current!.style.backgroundColor = "white";

        if (sdt?.trim() == "") {
            thongbaoRef.current!.innerHTML = "Chưa nhập số điện thoại";
            sdtRef.current!.style.backgroundColor = "#fe6532";
            sdtRef.current!.focus();
            return;
        } else sdtRef.current!.style.backgroundColor = "white";

        const ghi_chu = ghichu?.trim() || "";
        ghichuRef.current!.style.backgroundColor = "white";

        const orderData = {
            ho_ten: ht,
            email, 
            sdt, 
            dia_chi: diachi,
            ghi_chu,
        };

        fetch("http://localhost:3000/api/luudonhang", {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                thongbaoRef.current!.innerHTML = data.thong_bao;
                if (data.dh) {
                    luuchitietdonhang(data.dh.id, listSP);
                    dispatch(XoaGH());
                }
            })
            .catch(err => {
                console.log("Lỗi request lưu dh:", err);
                thongbaoRef.current!.innerHTML = "Có lỗi gì đó, xem trong log";
            });
    };

    const luuchitietdonhang = async (id_dh: number, cart: ICart[]) => {
        const url = "http://localhost:3000/api/luugiohang";
        const promises = cart.map(sp => {
            const t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong, gia_sp: sp.gia_mua, gia_tong: sp.gia_tong };
            const opt = {
                method: "POST",
                body: JSON.stringify(t),
                headers: { 'Content-Type': 'application/json' }
            };
            return fetch(url, opt).then(res => res.json())
                .catch(err => console.log('Lỗi lưu sản phẩm', err));
        });
        await Promise.all(promises);
        window.location.href = "/thanh-toan/hoan-tat";
    };

    return (
        <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
            <form action="" className="container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 shadow-sm dark:bg-gray-50">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="text-2xl">Form thanh toán đơn hàng của bạn</p>
                        <p className="text-base">Hãy hoàn thành tất cả các thông tin để mua hàng!</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Họ tên:</label>
                            <input ref={hotenRef} name="ho_ten" id="ho_ten" type="text" placeholder="Nhập họ tên của bạn" className="w-full h-10 text-base outline-none border border-gray-300 px-3" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Email:</label>
                            <input ref={emailRef} id="email" name="email" type="email" placeholder="Nhập email của bạn" className="w-full h-10 text-base outline-none border border-gray-300 px-3" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Số điện thoại:</label>
                            <input ref={sdtRef} id="sdt" name="sdt" type="text" placeholder="Nhập số điện thoại của bạn" className="w-full h-10 text-base outline-none border border-gray-300 px-3" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Địa chỉ:</label>
                            <input ref={diachiRef} id="dia_chi" name="dia_chi" type="text" placeholder="Nhập địa chỉ của bạn" className="w-full h-10 text-base outline-none border border-gray-300 px-3" />
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm">Ghi chú cho tài xế:</label>
                            <textarea ref={ghichuRef} id="ghi_chu" name="ghi_chu" placeholder="Nhập ghi chú hoặc mô tả của bạn" className="w-full h-30 text-base outline-none border border-gray-300 px-3"></textarea>
                        </div>
                        <div className="col-span-full">
                            <h3 className="text-base">Danh sách sản phẩm:</h3>
                            {listSP.map(sp => (
                                <p className="text-base" key={sp.id}>
                                    Tên: {sp.ten_sp} - SL: {sp.so_luong} - Giá SP: {sp.gia_mua.toLocaleString("vi-VN") + "₫"} - Tổng giá SP: {sp.gia_tong.toLocaleString("vi-VN") + "₫"}
                                </p>
                            ))}
                            <p className="text-xl font-bold">Tổng giá đơn hàng: {total.toLocaleString("vi-VN") + "₫"}</p>
                        </div>
                    </div>
                    <button onClick={submitDuLieu} type="button"
                        className="cursor-pointer bg-primary-700 px-5 py-2.5 text-base font-medium text-[#fff] bg-[#fe6532] border border-[#fe6532] hover:bg-[#fff] hover:text-gray-700">
                        Thanh toán
                    </button>
                    <div ref={thongbaoRef} className="font-medium text-xl text-[#fe6532]"></div>
                </fieldset>
            </form>
        </section>
    );
}