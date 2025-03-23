import Link from "next/link";
import { oneProd } from "./cautrucdata";
import { CiCalendarDate } from "react-icons/ci";
import { PiEyeThin } from "react-icons/pi";

function ShowSP({ sp }: { sp: oneProd }) {
  console.log(sp);
  return (
    <Link href={`/sp/${sp.slug}`} className="group relative bg-white p-2 border border-[#dfdfdf] transition-transform duration-300 hover:border-[#fe6532] hover:-translate-y-1">
      <div className="relative min-h-[166.66px]">
        <img
          src={sp.hinh}
          alt={sp.hinh}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="">
        <h3 className="clamp-2 min-h-[48px]">
          {sp.ten_sp}
        </h3>
        <div className="gap-2 my-1">
          <span className="text-[#fe6532] text-[1.2rem] text-lg mr-3">{sp.gia_km.toLocaleString('vi-VN') + '₫'}</span>
          <span className="text-gray-400 text-sm line-through">{sp.gia.toLocaleString('vi-VN') +'₫'}</span>
        </div>

        {/* Đánh giá & số lượng đã bán */}
        <div className="text-sm">
          <span className="flex items-center text-gray-700"><PiEyeThin className="mr-2"/> {sp.luot_xem} lượt xem</span>
        </div>

        {/* Ngày */}
        <p className="flex items-center text-gray-700 text-sm mt-1"><CiCalendarDate className="mr-2"/> {sp.ngay}</p>
      </div>
      <div className="absolute bottom-0 hidden w-full p-2 -mx-2 border border-[#fe6532] bg-[#fe6532] text-center text-white text-[14px] group-hover:block">
        Xem chi tiết
      </div>
    </Link>
  );
}
export default ShowSP;