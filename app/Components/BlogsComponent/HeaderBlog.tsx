import Link from "next/link";
import { TinTucModel } from "@/app/database";
import { CiAlarmOn } from "react-icons/ci";

async function HeaderBlog() {
    const tin_hot = await TinTucModel.findAll({
        where: { an_hien: 1 ,hot: 1},
        order: [['ngay', 'DESC'], ['luot_xem', 'ASC']],
        offset: 0, limit: 1,
      });

    const tin_arr = await TinTucModel.findAll({
        where: { an_hien: 1 },
        order: [['ngay', 'DESC'], ['luot_xem', 'ASC']],
        offset: 0, limit: 3,
      });

    return (
        <div className="max-w-6xl mx-auto p-4">
            <header className="text-center pb-4 mb-4">
                <h1 className="text-2xl font-bold">Trạm Thông Tin Mua Sắm Thông Minh</h1>
                <p className="text-gray-600">Trang Blog chính thức của Shopee Việt Nam</p>
            </header>

            <div className="grid grid-cols-3 gap-3">
                {tin_hot.map(tin => 
                <Link href={`tin/${tin.slug}`} key={tin.id} className="col-span-2 relative block">
                    <img src={tin.hinh} alt="Featured Post" className="w-full h-120 object-cover" />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-500 p-4 text-white w-full">
                        <span className="bg-red-500 text-xs px-2 py-1">{tin.tieu_de}</span>
                        <h2 className="clamp-2 tex-white text-base mt-2">
                            {tin.mo_ta}
                        </h2>
                        <p className="text-sm mt-1 flex items-center"><CiAlarmOn />Cập nhật: {tin.ngay}</p>
                    </div>
                </Link>
                )}

                <div className="flex flex-col gap-4">
                    {tin_arr.map(tin => 
                        <Link href={`tin/${tin.slug}`} key={tin.id} className="relative block">
                            <img src={tin.hinh} alt="Sidebar Post" className="w-full h-38 object-cover" />
                            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-500 p-2 text-white w-full">
                                <span className="bg-red-500 text-xs px-2 py-1 rounded">{tin.tieu_de}</span>
                                <p className="clamp-2 text-sm mt-1">{tin.mo_ta}</p>
                                <p className="text-sm mt-1 flex items-center"><CiAlarmOn />Cập nhật: {tin.ngay}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderBlog;