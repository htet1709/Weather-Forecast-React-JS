import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city.trim()) return;

    onSearch(city);
    setCity("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="町を入力してください..."
        className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-300 outline-none backdrop-blur-lg"
      />

      <button
        onClick={handleSearch}
        className="px-6 rounded-2xl bg-blue-500 hover:bg-blue-600 transition duration-300 text-white flex items-center justify-center"
      >
        <Search size={22} />
        <span className="ml-2">検索</span>
      </button>
    </div>
  );
}

export default SearchBar;