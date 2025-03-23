import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsBell, BsQuestionCircle, BsGlobe } from "react-icons/bs";

function TopHeader() {
    return (
        <div className="flex justify-between items-center py-2">
        <div className="flex space-x-4">
          <Link href="#">Kênh Người Bán</Link>
          <span>|</span>
          <Link href="#">Tải Ứng Dụng</Link>
          <span>|</span>
          <Link href="#" className="flex items-center space-x-1">
            <span>Kết Nối</span>
            <FaFacebook />
            <FaInstagram />
          </Link>
        </div>
        <div className="flex space-x-2 items-center">
          <BsBell /> <span>Thông Báo</span>
          <BsQuestionCircle /> <span>Hỗ Trợ</span>
          <BsGlobe /> <span>Tiếng Việt</span>
        </div>
      </div>
    )
}

export default TopHeader;