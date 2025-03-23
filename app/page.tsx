"use client";
import Banner from "./Components/BannerCompn";
import { oneProd } from "./Components/cautrucdata";
import ShowSP from "./Components/ShowSP";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [sphot, setSphot] = useState([]);
  const [spmoi, setSpmoi] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/sphot/8`)
    .then(res => res.json())
    .then(data => setSphot(data))
    .catch(error => console.log("lỗi lấy sản phẩm hot:", error))

    fetch(`http://localhost:3000/api/spmoi/8`)
    .then(res => res.json())
    .then(data => setSpmoi(data))
    .catch(error => console.log("lỗi lấy sản phẩm mới:", error))
  }, []);

  return (
    <div className="home">
      <Banner />
      <div className="sphot">
        <div className="bg-[#ebebeb] p-2 my-6  text-base text-[#000] flex justify-between">
          <h2 className="uppercase text-[#fe6532]">Sản phẩm nổi bật</h2>
          <Link href="" className="hover:text-[#fe6532]">Xem tất cả</Link>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {sphot.map((sp: oneProd) => (
            <ShowSP key={sp.id} sp={sp} />
          ))}
        </div>
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
  )
}
