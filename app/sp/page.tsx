import Link from "next/link";

export default function SpIndex() {
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