"use client";
import Link from "next/link";
import { oneProd } from "../Components/cautrucdata";
import ShowSP from "../Components/ShowSP";
import { useState, useEffect } from "react";

export default function SPLienQuan({ id, id_loai }: { id: number, id_loai: number }) {
    const sosp = 4;
    const [listLienQuan, setlistLienQuan] = useState<oneProd[]>([]);
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading

    useEffect(() => {
        async function fetchLienQuan() {
            try {
                setLoading(true); // Bắt đầu loading
                const response = await fetch(`http://localhost:3000/api/sp_lien_quan/${id}/${sosp}`);
                const data = await response.json();
                setlistLienQuan(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false); // Kết thúc loading
            }
        }

        fetchLienQuan();
    }, [id]);

    return (
        <div className="">
            <div className="bg-[#ebebeb] p-2 my-6 text-base text-[#000] flex justify-between">
                <h2 className="uppercase text-[#fe6532]">Sản phẩm liên quan</h2>
                <Link href="" className="hover:text-[#fe6532]">
                    Xem tất cả
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-10">
                {loading ? (
                    <p>Đang tải...</p>
                ) : listLienQuan.length > 0 ? (
                    listLienQuan.map((sp: oneProd) => (
                        <ShowSP key={sp.id} sp={sp} />
                    ))
                ) : (
                    <p>Không có sản phẩm liên quan.</p> 
                )}
            </div>
        </div>
    );
}