"use client";
import { useEffect, useState } from "react";
import NavbarSP from "./navbarsp";
import TopMain from "./topmain";
import { oneProd } from "../Components/cautrucdata";
import ShowSP from "../Components/ShowSP";

export default function SanPham() {
    const [spmoi, setSpmoi] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/api/spmoi/`)
            .then(res => {
                if (!res.ok) throw new Error("Lỗi fetch API");
                return res.json();
            })
            .then(data => {
                console.log("Dữ liệu từ API:", data);
                setSpmoi(data);
            })
            .catch(error => console.log("Lỗi lấy loại sản phẩm:", error));
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex gap-4">
                <NavbarSP />

                <main className="w-5/6">
                    <TopMain />
                    <div className="">
                        <div className="grid grid-cols-4 gap-6">
                            {spmoi.map((sp: oneProd) => (
                                <ShowSP key={sp.id} sp={sp} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}