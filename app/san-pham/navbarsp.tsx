"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { oneCate } from "../Components/cautrucdata";

export default function NavbarSP() {
    const [loais, setLoais] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/loai`)
            .then(res => {
                if (!res.ok) throw new Error("Lỗi fetch API");
                return res.json();
            })
            .then(data => {
                console.log("Dữ liệu từ API:", data);
                setLoais(data);
            })
            .catch(error => console.log("Lỗi lấy loại sản phẩm:", error));
    }, []);

    return (
        <aside className="w-1/5 bg-white p-4">
            <div className="flex items-center">
                <svg className="w-5 h-auto inline-block align-middle" viewBox="0 0 15 15">
                    <g>
                        <polyline fill="#fe6532" points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1"></polyline>
                    </g>
                </svg>
                <h2 className="text-lg ml-2">Bộ lọc tìm kiếm</h2>
            </div>
            <hr className="my-3 text-[#dfdfdf]" />
            <h4 className="text-base mb-3 text-gray-700">Theo danh mục</h4>
            <ul className="space-y-2 text-gray-700 text-sm">

                {loais.map((loai: oneCate) =>
                    <li key={loai.id} className="flex items-center">
                        <Link href={`/sptheoloai/${loai.id}`} className="hover:text-[#fe6532]">
                            {loai.ten_loai}
                        </Link>
                    </li>
                )}
            </ul>
            <hr className="my-3 text-[#dfdfdf]" />
            <h4 className="text-base mb-3 text-gray-700">Theo Nơi bán</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
                {["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Đồng Nai"].map((city, index) => (
                    <li key={index} className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <Link href="#" className="hover:text-red-600">{city}</Link>
                    </li>
                ))}
            </ul>
            <hr className="my-3 text-[#dfdfdf]" />
        </aside>
    )
}