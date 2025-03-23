"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import ShowSP from "../Components/ShowSP";
import { useContext, useEffect, useState } from "react";
import { useContextGlobal } from "../Components/HeaderComponent/GlobalStateContext";
import { oneProd } from "../Components/cautrucdata";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || ""; // Lấy giá trị 'search' từ URL
  const pageFromUrl = Number(searchParams.get("page")) || 1; // Lấy page từ URL
  const { searchState, setSearchState } = useContextGlobal();
  const { searchResults, currentPage, totalPages } = searchState;
  const [loading, setLoading] = useState(false);

  // Cập nhật trang khi URL thay đổi hoặc lần đầu load
  useEffect(() => {
    if (pageFromUrl !== currentPage && searchQuery) {
      handlePageChange(pageFromUrl);
    }
  }, [pageFromUrl, searchQuery, currentPage]);

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage === currentPage || !searchQuery) return; // Chỉ kiểm tra newPage < 1
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/search/${searchQuery}?page=${newPage}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const kq_sp = await res.json();
      console.log("KQ: "+kq_sp);
      
      if (!kq_sp || !kq_sp.data || kq_sp.data.length === 0) {
        setSearchState({ ...searchState, searchResults: [], currentPage: newPage, totalPages: 1 });
        return;
      }
      setSearchState({
        searchResults: kq_sp.data,
        currentPage: newPage,
        totalPages: kq_sp.totalPages || 1, // Đảm bảo totalPages có giá trị
      });
      // Điều hướng đến trang mới
      router.push(`/productSearch?search=${searchQuery}&page=${newPage}`);
    } catch (error) {
      console.error("Lỗi khi thay đổi trang:", error);
      setSearchState({ ...searchState, searchResults: [], currentPage: newPage, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-4">
        <aside className="w-1/5 bg-white p-4">
          <div className="flex items-center">
            <svg className="w-5 h-auto inline-block align-middle" viewBox="0 0 15 15">
              <g>
                <polyline fill="#fe6532" points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1"></polyline>
              </g>
            </svg>
            <h2 className="text-lg ml-2">Bộ lọc tìm kiếm</h2>
          </div>
          <hr className="my-3 text-[#dfdfdf]" />
          <h4 className="text-base mb-3 text-gray-700">Theo danh mục</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center">
              <Link href="" className="hover:text-red-600">
                Danh mục
              </Link>
            </li>
          </ul>
          <hr className="my-3 text-[#dfdfdf]" />
          <h4 className="text-base mb-3 text-gray-700">Theo Nơi bán</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            {["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Đồng Nai"].map((city, index) => (
              <li key={index} className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <a href="#" className="hover:text-red-600">{city}</a>
              </li>
            ))}
          </ul>
          <hr className="my-3 text-[#dfdfdf]" />
        </aside>

        <main className="w-5/6">
          <div className="flex justify-between items-center mb-4 bg-[#ededed] p-2">
            <div className="grid grid-cols-5 gap-2">
              <span className="text-lg">Sắp xếp theo:</span>
              {["Mới nhất", "Phổ Biến"].map((label, index) => (
                <button key={index} className="py-2 text-sm text-gray-600 px-2 bg-white">{label}</button>
              ))}
              <button className="relative py-2 text-sm text-gray-600 px-4 bg-white flex justify-between items-center group">
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
              <p>{currentPage}/{totalPages}</p>
            </div>
          </div>
          <div className="timkiem">
            <div className="flex mb-4">
              <svg viewBox="0 0 18 24" className="w-3">
                <g transform="translate(-355 -149)">
                  <g transform="translate(355 149)">
                    <g fill="nonzero" transform="translate(5.4 19.155556)">
                      <path d="m1.08489412 1.77777778h5.1879153c.51164401 0 .92641344-.39796911.92641344-.88888889s-.41476943-.88888889-.92641344-.88888889h-5.1879153c-.51164402 0-.92641345.39796911-.92641345.88888889s.41476943.88888889.92641345.88888889z"></path>
                      <g transform="translate(1.9 2.666667)">
                        <path d="m .75 1.77777778h2.1c.41421356 0 .75-.39796911.75-.88888889s-.33578644-.88888889-.75-.88888889h-2.1c-.41421356 0-.75.39796911-.75.88888889s.33578644.88888889.75.88888889z"></path>
                      </g>
                    </g>
                    <path d="m8.1 8.77777718v4.66666782c0 .4295545.40294373.7777772.9.7777772s.9-.3482227.9-.7777772v-4.66666782c0-.42955447-.40294373-.77777718-.9-.77777718s-.9.34822271-.9.77777718z" fill="nonzero"></path>
                    <path d="m8.1 5.33333333v.88889432c0 .49091978.40294373.88888889.9.88888889s.9-.39796911.9-.88888889v-.88889432c0-.49091977-.40294373-.88888889-.9-.88888889s-.9.39796912-.9.88888889z" fill="nonzero"></path>
                    <path d="m8.80092773 0c-4.86181776 0-8.80092773 3.97866667-8.80092773 8.88888889 0 1.69422221.47617651 3.26933331 1.295126 4.61333331l2.50316913 3.9768889c.30201078.4782222.84303623.7697778 1.42482388.7697778h7.17785139c.7077799 0 1.3618277-.368 1.7027479-.9617778l2.3252977-4.0213333c.7411308-1.2888889 1.1728395-2.7786667 1.1728395-4.37688891 0-4.91022222-3.9409628-8.88888889-8.80092777-8.88888889m0 1.77777778c3.82979317 0 6.94810087 3.18933333 6.94810087 7.11111111 0 1.24444441-.3168334 2.43022221-.9393833 3.51466671l-2.3252977 4.0213333c-.0166754.0284444-.0481735.0462222-.0833772.0462222h-7.07224026l-2.43461454-3.8648889c-.68184029-1.12-1.04128871-2.4053333-1.04128871-3.71733331 0-3.92177778 3.11645483-7.11111111 6.94810084-7.11111111"></path>
                  </g>
                </g>
              </svg>
              <h2 className="text-xl">Kết quả tìm kiếm từ khóa <span className="text-[#fe6532]">{searchQuery}</span></h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {loading ? (
                <p>Đang tải...</p>
              ) : searchResults.length === 0 ? (
                <p>Không tìm thấy sản phẩm.</p>
              ) : (
                searchResults.map((sp: oneProd) => (
                  <ShowSP key={sp.id} sp={sp} />
                ))
              )}
            </div>
            {!loading && searchResults.length > 0 && (
              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded-l disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="mx-4">
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded-r disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}