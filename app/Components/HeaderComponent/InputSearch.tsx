"use client";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function InputSearch() {
  const router = useRouter();
  const [tu_khoa, setTuKhoa] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); 

  // Lấy gợi ý khi từ khóa thay đổi
  useEffect(() => {
    if (tu_khoa.length > 0) {
      fetchSuggestions(tu_khoa);
    } else {
      setSuggestions([]);
      setSelectedIndex(-1); 
    }
  }, [tu_khoa]);

  const fetchSuggestions = async (keyword: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/suggestions/${keyword}`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Lỗi lấy gợi ý:", err);
      setSuggestions([]);
    }
  };

  // Tìm kiếm và xóa input
  const handleSearch = (searchTerm: string = tu_khoa) => {
    if (searchTerm.trim() === "") return;
    router.push(`/productSearch?search=${searchTerm}&page=1`);
    setTuKhoa(""); 
    setSuggestions([]); 
    setSelectedIndex(-1); 
  };

  // Xử lý phím mũi tên và Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) {
      if (e.key === "Enter") handleSearch();
      return;
    }

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSearch(suggestions[selectedIndex]);
    } else if (e.key === "Enter") {
      handleSearch(); 
    }
  };

  // Tìm kiếm khi click gợi ý
  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion); // Dùng hàm chung để tìm kiếm và xóa
  };

  return (
    <div className="group relative flex flex-grow max-w-[600px] items-center border bg-white">
      <input
        type="text"
        value={tu_khoa}
        placeholder="Nhập tên sản phẩm ..."
        className="p-2 flex-grow outline-none text-black"
        onChange={(e) => setTuKhoa(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => handleSearch()} className="bg-[#f5412d] p-2">
        <IoIosSearch size={20} />
      </button>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 w-full bg-white border border-[#dfdfdf] text-gray-600 mt-1 z-20">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                index === selectedIndex ? "bg-gray-200" : ""
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputSearch;