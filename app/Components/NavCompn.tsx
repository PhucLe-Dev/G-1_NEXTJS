import Link from "next/link";
function Nav() {
    console.log("Trang chủ đã render");
    return (
        <nav className="flex justify-center items-center">
            <ul className="flex align-middle">
                <li className="p-4"><Link className="text-[1rem]" href="/">Trang chủ</Link></li>
                <li className="p-4"><Link className="text-[1rem]" href="/product">Sản phẩm</Link></li>
                <li className="p-4"><Link className="text-[1rem]" href="/blogs">Tin tức</Link></li>
                <li className="p-4"><Link className="text-[1rem]" href="/contact">Liên hệ</Link></li>
            </ul>
        </nav>
    )
}
export default Nav;