import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
function Footer() {
    return (
        <div className="text-gray-600 text-sm mt-8">
            <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <h3 className="font-bold mb-2">CHĂM SÓC KHÁCH HÀNG</h3>
                    <ul className="space-y-1">
                        <li>Trung tâm trợ giúp</li>
                        <li>Hướng dẫn mua hàng</li>
                        <li>Hướng dẫn bán hàng</li>
                        <li>Thanh toán</li>
                        <li>Vận chuyển</li>
                        <li>Trả hàng & Hoàn tiền</li>
                        <li>Chính sách bảo hành</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">VỀ SHOPEE</h3>
                    <ul className="space-y-1">
                        <li>Giới thiệu về Shopee</li>
                        <li>Tuyển dụng</li>
                        <li>Điều khoản Shopee</li>
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách mua hàng</li>
                        <li>Liên hệ truyền thông</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">THEO DÕI CHÚNG TÔI</h3>
                    <ul className="space-y-1">
                        <li className="flex items-center"><CiFacebook /> Facebook</li>
                        <li className="flex items-center"><CiInstagram /> Instagram</li>
                        <li className="flex items-center"><CiTwitter /> Twitter</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">THANH TOÁN</h3>
                    <div className="flex gap-2 flex-wrap">
                        <img src="/imagesBuy/buy1.jpg" alt="Visa" className="h-6" />
                        <img src="/imagesBuy/category1.jpg" alt="VNPay" className="h-6" />
                        <img src="/imagesBuy/category2.jpg" alt="PayPal" className="h-6" />
                        <img src="/imagesBuy/category3.jpg" alt="PayPal" className="h-6" />
                        <img src="/imagesBuy/category4.jpg" alt="PayPal" className="h-6" />
                        <img src="/imagesBuy/category5.jpg" alt="PayPal" className="h-6" />
                        <img src="/imagesBuy/category6.jpg" alt="PayPal" className="h-6" />
                    </div>
                    <h3 className="font-bold mt-4 mb-2">ĐƠN VỊ VẬN CHUYỂN</h3>
                    <div className="flex gap-2 flex-wrap">
                        <img src="/imagesBuy/transport1.jpg" alt="SPX" className="h-6" />
                        <img src="/imagesBuy/transport6.jpg" alt="J&T" className="h-6" />
                        <img src="/imagesBuy/transport4.jpg" alt="Viettel Post" className="h-6" />
                        <img src="/imagesBuy/transport2.jpg" alt="Viettel Post" className="h-6" />
                        <img src="/imagesBuy/transport3.jpg" alt="Viettel Post" className="h-6" />
                        <img src="/imagesBuy/transport5.jpg" alt="Viettel Post" className="h-6" />
                    </div>
                </div>
            </div>
            <div className="border-t py-4 text-center text-xs text-gray-600">
                <div className="max-w-6xl mx-auto px-6 py-4 text-center">
                    <p className="mb-2 text-base">
                        <a href="#" className="text-gray-600 hover:underline">Chính sách bảo mật</a> |
                        <a href="#" className="text-gray-600 hover:underline"> Quy chế hoạt động</a> |
                        <a href="#" className="text-gray-600 hover:underline"> Chính sách vận chuyển</a>
                    </p>
                </div>
                <p>© 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
                <p className="mt-2">Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, Hà Nội</p>
            </div>
        </div>
    )
}
export default Footer;