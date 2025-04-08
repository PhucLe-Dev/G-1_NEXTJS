"use client";
import { useSearchParams, useRouter } from "next/navigation";
import ShowSP from "../Components/ShowSP";
import { useEffect, useState } from "react";
import { oneProd } from "../Components/cautrucdata";
import NavbarSP from "../san-pham/navbarsp";
import TopMain from "../san-pham/topmain";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [searchResults, setSearchResults] = useState<oneProd[]>([]);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Gọi API khi searchQuery hoặc pageFromUrl thay đổi
  useEffect(() => {
    if (!searchQuery) return;
    fetchSearchResults(searchQuery, pageFromUrl);
  }, [searchQuery, pageFromUrl]);

  const fetchSearchResults = async (query: string, page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/search/${query}?page=${page}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        setSearchResults([]);
        setTotalPages(1);
        setCurrentPage(page);
        return;
      }

      setSearchResults(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
      setSearchResults([]);
      setTotalPages(1);
      setCurrentPage(page);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/productSearch?search=${searchQuery}&page=${newPage}`);
  };

  // Tạo dãy số trang
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Tối đa 5 số trang hiển thị
    let startPage = Math.max(1, currentPage - 2); // Bắt đầu từ trang hiện tại - 2
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1); // Kết thúc sau 5 trang

    // Điều chỉnh startPage nếu endPage chạm đến totalPages
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Thêm các số trang vào mảng
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`text-2xl flex items-center justify-center mx-3 px-3 py-1 cursor-pointer hover:bg-[#dfdfdf] 
          ${i === currentPage ? "bg-[#fe6532] text-white" : "text-gray-700"}`}
        >
          {i}
        </button>
      );
    }

    // Thêm dấu "..." nếu có nhiều trang hơn
    if (endPage < totalPages) {
      pageNumbers.push(
        <span key="ellipsis" className="mx-2 text-base text-gray-700">
          ...
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-4">
        <NavbarSP />
        <main className="w-5/6">
          <TopMain />
          <div className="timkiem">
            <div className="flex mb-4">
            <svg viewBox="0 0 18 24" className="w-3 mr-2 shopee-svg-icon icon-hint-bulb"><g transform="translate(-355 -149)"><g transform="translate(355 149)"><g fillRule="nonzero" transform="translate(5.4 19.155556)"><path d="m1.08489412 1.77777778h5.1879153c.51164401 0 .92641344-.39796911.92641344-.88888889s-.41476943-.88888889-.92641344-.88888889h-5.1879153c-.51164402 0-.92641345.39796911-.92641345.88888889s.41476943.88888889.92641345.88888889z"></path><g transform="translate(1.9 2.666667)"><path d="m .75 1.77777778h2.1c.41421356 0 .75-.39796911.75-.88888889s-.33578644-.88888889-.75-.88888889h-2.1c-.41421356 0-.75.39796911-.75.88888889s.33578644.88888889.75.88888889z"></path></g></g><path d="m8.1 8.77777718v4.66666782c0 .4295545.40294373.7777772.9.7777772s.9-.3482227.9-.7777772v-4.66666782c0-.42955447-.40294373-.77777718-.9-.77777718s-.9.34822271-.9.77777718z" fill-rule="nonzero"></path><path d="m8.1 5.33333333v.88889432c0 .49091978.40294373.88888889.9.88888889s.9-.39796911.9-.88888889v-.88889432c0-.49091977-.40294373-.88888889-.9-.88888889s-.9.39796912-.9.88888889z" fill-rule="nonzero"></path><path d="m8.80092773 0c-4.86181776 0-8.80092773 3.97866667-8.80092773 8.88888889 0 1.69422221.47617651 3.26933331 1.295126 4.61333331l2.50316913 3.9768889c.30201078.4782222.84303623.7697778 1.42482388.7697778h7.17785139c.7077799 0 1.3618277-.368 1.7027479-.9617778l2.3252977-4.0213333c.7411308-1.2888889 1.1728395-2.7786667 1.1728395-4.37688891 0-4.91022222-3.9409628-8.88888889-8.80092777-8.88888889m0 1.77777778c3.82979317 0 6.94810087 3.18933333 6.94810087 7.11111111 0 1.24444441-.3168334 2.43022221-.9393833 3.51466671l-2.3252977 4.0213333c-.0166754.0284444-.0481735.0462222-.0833772.0462222h-7.07224026l-2.43461454-3.8648889c-.68184029-1.12-1.04128871-2.4053333-1.04128871-3.71733331 0-3.92177778 3.11645483-7.11111111 6.94810084-7.11111111"></path></g></g></svg>
              <h2 className="text-xl">
                Kết quả tìm kiếm từ khóa <span className="text-[#fe6532]">{searchQuery}</span>
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {loading ? (
                <p className="text-2xl">Đang tải...</p>
              ) : searchResults.length === 0 ? (
                <p className="text-2xl">Không tìm thấy sản phẩm này</p>
              ) : (
                searchResults.map((sp: oneProd) => <ShowSP key={sp.id} sp={sp} />)
              )}
            </div>
            {!loading && searchResults.length > 0 && (
              <div className="flex items-center justify-center mt-7">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-3xl mx-6 text-[#666] cursor-pointer disabled:opacity-50"
                >
                  &lt;
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="text-3xl mx-6 text-[#666] cursor-pointer disabled:opacity-50"
                >
                  &gt;
                </button>
            </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}