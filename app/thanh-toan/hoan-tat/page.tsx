import Link from "next/link";

export default function CamOn() {
    return(
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 text-center">
        <div className="py-10">
            <img
                src="https://demoda.vn/wp-content/uploads/2023/02/hinh-anh-dong-cam-on-dep-cute.gif"
                alt="Empty Cart"
                className="w-40 h-40 mx-auto"
            />
            <p className="text-lg text-gray-600 mt-4">Cám ơn bạn vì đã mua hàng</p>
            <Link
                href="/"
                className="mt-4 inline-block px-6 py-2 bg-[#fe6532] border border-[#fe6532] text-white text-base hover:bg-white hover:text-[#333]"
            >
                Trở về trang chủ
            </Link>
        </div>
    </div>
    )
}