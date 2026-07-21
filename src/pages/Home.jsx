import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import HourlyForecast from "../components/HourlyForecast";
import { getWeather } from "../services/weatherApi";

function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] =
    useState([]);

  // Search Weather
  const handleSearch = async (city) => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await getWeather(city);

      setWeather(data);

      // 最後に検索した都市を保存
      localStorage.setItem(
        "lastCity",
        city
      );

      // Save recent searches
      setRecentSearches((prev) => {
        const updated = [
          city,
          ...prev.filter(
            (item) =>
              item.toLowerCase() !==
              city.toLowerCase()
          ),
        ];

        return updated.slice(0, 5);
      });
    } catch (err) {
      setError("都市が見つかりません");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Get Current Location Weather
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "このブラウザは位置情報に対応していません"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);
          setError("");

          const lat =
            position.coords.latitude;

          const lon =
            position.coords.longitude;

          const data =
            await getWeather(
              `${lat},${lon}`
            );

          setWeather(data);
        } catch (err) {
          setError(
            "現在地の天気を取得できませんでした"
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError(
          "位置情報の使用が許可されませんでした"
        );
      }
    );
  };

  // Load Last City or Tokyo
  useEffect(() => {
    const savedCity =
      localStorage.getItem(
        "lastCity"
      );

    handleSearch(
      savedCity || "Tokyo"
    );
  }, []);

  // Dynamic Background
  const getWeatherBackground = () => {
    const condition =
      weather?.current?.condition?.text?.toLowerCase();

    if (
      condition?.includes("sunny")
    ) {
      return "from-yellow-500 via-orange-400 to-sky-500";
    }

    if (
      condition?.includes("rain") ||
      condition?.includes("drizzle")
    ) {
      return "from-slate-800 via-blue-900 to-gray-900";
    }

    if (
      condition?.includes("cloud")
    ) {
      return "from-slate-700 via-gray-700 to-slate-900";
    }

    if (
      condition?.includes("snow")
    ) {
      return "from-sky-200 via-slate-300 to-slate-500";
    }

    if (
      condition?.includes("clear")
    ) {
      return "from-blue-700 via-sky-500 to-cyan-400";
    }

    return "from-slate-900 via-blue-900 to-slate-800";
  };

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${getWeatherBackground()} transition-all duration-700 px-4 py-10`}
    >
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-center text-white text-5xl font-bold mb-2">
          🌍 天気予報
        </h1>

        <p className="text-center text-slate-200 mb-8 text-lg">
            町の名前を入力して、現在の天気と予報を確認しましょう！
        </p>

        {/* 検索 + 現在地 */}
        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">
            <SearchBar
              onSearch={
                handleSearch
              }
            />
          </div>

          <button
            onClick={
              handleCurrentLocation
            }
            className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white backdrop-blur-lg hover:bg-white/20 transition"
          >
            📍 現在地
          </button>
        </div>

        {/* 最近の検索 */}
        {recentSearches.length >
          0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {recentSearches.map(
              (city, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleSearch(
                      city
                    )
                  }
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-lg hover:bg-white/20 transition"
                >
                  {city}
                </button>
              )
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mt-10">
            <div className="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 text-center">
            <p className="text-red-400 text-lg font-semibold">
              {error}
            </p>
          </div>
        )}

        {/* Weather Display */}
        {weather &&
          !loading && (
            <div className="space-y-8 mt-10">

              {/* Current Weather */}
              <WeatherCard
                weather={
                  weather
                }
              />

              {/* Next 72 Hours */}
              <HourlyForecast
                forecast={
                  weather.forecast
                }
              />

              {/* 3 Day Forecast */}
              <Forecast
                forecast={
                  weather.forecast
                }
              />
            </div>
          )}
      </div>
    </div>
  );
}

export default Home;