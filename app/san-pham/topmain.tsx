export default function TopMain() {
    return (
        <div className="flex justify-between items-center mb-4 bg-[#ededed] p-2">
            <div className="grid grid-cols-5 gap-2">
                <span className="text-lg">Sắp xếp theo:</span>

                <button className="py-2 text-sm text-gray-600 px-2 bg-white">Mới nhất</button>

                <button className="py-2 text-sm text-gray-600 px-4 bg-white flex justify-between items-center">
                    Lượt xem
                    <svg viewBox="0 0 10 6" className="shopee-svg-icon icon-arrow-down-small w-2 h-2">
                        <path d="M9.7503..." fillRule="nonzero"></path>
                    </svg>
                </button>
                <button className="py-2 text-sm text-gray-600 px-6 bg-white flex justify-between items-center">
                    Giá
                    <svg viewBox="0 0 10 6" className="shopee-svg-icon icon-arrow-down-small w-2 h-2">
                        <path d="M9.7503..." fillRule="nonzero"></path>
                    </svg>
                </button>
            </div>
            <div>
                <p></p>
            </div>
        </div>
    )
}