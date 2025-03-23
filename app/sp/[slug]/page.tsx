"use client";
import { oneProd } from "@/app/Components/cautrucdata";
import ShowDetailProd from "@/app/ShowDetailProd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DetailProd() {
    const pathname = usePathname();
    const slug = pathname.split("/").pop(); // Lấy phần cuối của URL

    console.log("slug detail:", slug);

    let spnull: oneProd = {
        id: 0, ten_sp: '', slug: '', hinh: '', gia: 0, gia_km: 0, luot_xem: 1, ngay: '',
        tinh_chat: '', id_loai: 0, hot: "0", an_hien: '0'
    };
    const [detail, setDetail] = useState<oneProd>(spnull);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetch(`http://localhost:3000/api/sp/${slug}`)
            .then(res => {
                if (!res.ok) { // Kiểm tra nếu phản hồi không thành công (ví dụ: 404)
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (!data || !data.slug || data.slug !== slug) { // Kiểm tra slug không khớp
                    setError(true);
                    document.title = "Sản phẩm không tìm thấy - Shopee";
                } else {
                    setDetail(data);
                    setError(false);
                    document.title = data.ten_sp ? `${data.ten_sp} - Shopee` : "Sản phẩm không tìm thấy - Shopee";
                }
            })
            .catch(err => {
                console.error("Lỗi fetch sản phẩm:", err);
                setError(true);
                document.title = "Sản phẩm không tìm thấy - Shopee";
            });
    }, [slug]);

    if (error) {
        return (
            <div className="w-full min-h-[450px] grid place-items-center text-center mx-auto">
                <div className="">
                    <img src="../error.png" alt="Error Image" className="mx-auto" />
                    <p className="text-[1.2rem] py-5">ShopWhere không tải được thông tin từ URL của bạn</p>
                    <Link href="/" className="text-[1rem] py-2 px-5 bg-[#fe6532] border border-[#fe6532] duration-300 ease-in text-white hover:bg-[#f5f5f5] hover:text-[#fe6532]">
                        Trở lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return <ShowDetailProd sp={detail} />;
}