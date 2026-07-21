function Forecast({ forecast }) {
  // Prevent crash if no forecast data
  if (!forecast?.forecastday) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-white text-2xl font-bold mb-5 text-center">
        3日間の予報
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {forecast.forecastday.map((day) => (
          <div
            key={day.date}
            className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-6 text-white shadow-lg hover:scale-105 transition duration-300"
          >
            {/* 日付 */}
            <h3 className="text-xl font-semibold text-center mb-4">
              {new Date(day.date).toLocaleDateString(
                "ja-JP",
                {
                  weekday: "long",
                }
              )}
            </h3>

            {/* アイコン */}
            <div className="flex justify-center">
              <img
                src={day.day.condition.icon}
                alt="天気アイコン"
                className="w-20 h-20"
              />
            </div>

            {/* 天気 */}
            <p className="text-center text-slate-300 mt-2 capitalize">
              {day.day.condition.text}
            </p>

            {/* 温度 */}
            <div className="mt-5 space-y-2 text-center">
              <p className="text-lg">
                🌡️ 最高:
                {" "}
                <span className="font-bold">
                  {Math.round(day.day.maxtemp_c)}°C
                </span>
              </p>

              <p className="text-lg">
                ❄️ 最低:
                {" "}
                <span className="font-bold">
                  {Math.round(day.day.mintemp_c)}°C
                </span>
              </p>

              <p className="text-lg">
                💧 湿度:
                {" "}
                <span className="font-bold">
                  {day.day.avghumidity}%
                </span>
              </p>

              <p className="text-lg">
                🌬️ 風速:
                {" "}
                <span className="font-bold">
                  {Math.round(day.day.maxwind_kph)}
                  {" "}km/h
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;