"use client";
import { oneProd } from "@/app/Components/cautrucdata";
import ShowSP from "@/app/Components/ShowSP";
import NavbarSP from "@/app/san-pham/navbarsp";
import TopMain from "@/app/san-pham/topmain";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SpTheoLoai() {
    const params = useParams(); // lấy thông tin truyền vào từ url
    const id_loai = params.id;
    const [sptrongloai, setSptrongloai] = useState([] as oneProd[]);
    const [loai, setLoai] = useState({id:0, ten_loai:''});

   // Kiểm tra nếu id_loai không hợp lệ (không phải số hoặc rỗng)
    if (!id_loai || isNaN(Number(id_loai))) {
        return (
            <div className="w-full min-h-[450px] grid place-items-center text-center mx-auto">
                <div>
                    <img src="../error.png" alt="Error Image" className="mx-auto" />
                    <p className="text-[1.2rem] py-5">ShopWhere không nhận diện được loại sản phẩm bạn đang tìm kiếm</p>
                    <Link href="/" className="text-[1rem] py-2 px-5 bg-[#fe6532] border border-[#fe6532] duration-300 ease-in text-white hover:bg-[#f5f5f5] hover:text-[#fe6532]">
                        Trở lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    useEffect(() => {
        fetch( `http://localhost:3000/api/sptrongloai/${id_loai}`)
        .then(res => res.json())
        .then(data => setSptrongloai(data))
        .catch(err => console.log("lỗi lấy api sp trong loại: ", err))

        fetch(`http://localhost:3000/api/loai/${id_loai}`)
        .then(res => res.json())
        .then(data => setLoai(data))
        .catch(err => console.log("lỗi lấy loại sản phẩm: ", err))
    }, [sptrongloai, loai])

    // Kiểm tra nếu không có dữ liệu hợp lệ
    if (sptrongloai.length === 0 || loai.id === 0) {
        return (
            <div className="w-full min-h-[450px] grid place-items-center text-center mx-auto">
                <div>
                    <img src="../error.png" alt="Error Image" className="mx-auto" />
                    <p className="text-[1.2rem] py-5">
                        ShopWhere không tìm thấy loại sản phẩm bạn đang tìm kiếm
                    </p>
                    <Link href="/" className="text-[1rem] py-2 px-5 bg-[#fe6532] border border-[#fe6532] duration-300 ease-in text-white hover:bg-[#f5f5f5] hover:text-[#fe6532]">
                        Trở lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
       <div className="container mx-auto">
                   <div className="flex gap-4">
                       <NavbarSP />
                       <main className="w-5/6">
                           <TopMain />
                           <div className="">
                               <div className="grid grid-cols-4 gap-6">
                                   {sptrongloai.map((sp: oneProd) => (
                                       <ShowSP key={sp.id} sp={sp} />
                                   ))}
                               </div>
                           </div>
                       </main>
                   </div>
               </div>
    )
}