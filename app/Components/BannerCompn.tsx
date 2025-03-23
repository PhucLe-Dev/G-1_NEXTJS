function Banner() {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-7">
            {/* Banner lớn bên trái */}
            <div className="col-span-2">
                <img
                    src="/imagesBanner/banner1.png"
                    alt="Banner lớn"
                    className="w-full h-auto"
                />
            </div>

            {/* Banner nhỏ bên phải */}
            <div className="flex flex-col gap-2">
                <img
                    src="/imagesBanner/bannertinh1.png"
                    alt="Banner nhỏ 1"
                    className="w-full h-auto"
                />
                <img
                    src="/imagesBanner/bannertinh2.png"
                    alt="Banner nhỏ 2"
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
}

export default Banner;