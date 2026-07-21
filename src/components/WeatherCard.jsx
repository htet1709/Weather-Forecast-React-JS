function WeatherCard({ weather }) {
  return (
    <div className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-lg p-8 text-white shadow-xl">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-4xl font-bold">
            {weather.location.name}
          </h2>

          <p className="text-slate-300 text-lg">
            {weather.location.country}
          </p>

          <p className="text-slate-200 mt-2">
            {weather.current.condition.text}
          </p>
        </div>

        <div className="text-right">
          <img
            src={weather.current.condition.icon}
            alt="天気"
            className="w-24 ml-auto"
          />

          <h1 className="text-6xl font-bold">
            {Math.round(weather.current.temp_c)}°C
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

        <div className="bg-white/10 p-4 rounded-2xl">
          <p className="text-slate-300">
            湿度
          </p>
          <h3 className="text-xl font-bold">
            {weather.current.humidity}%
          </h3>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl">
          <p className="text-slate-300">
            風速
          </p>
          <h3 className="text-xl font-bold">
            {weather.current.wind_kph} km/h
          </h3>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl">
          <p className="text-slate-300">
            体感温度
          </p>
          <h3 className="text-xl font-bold">
            {weather.current.feelslike_c}°C
          </h3>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl">
          <p className="text-slate-300">
            現地時間
          </p>
          <h3 className="text-xl font-bold">
            {weather.location.localtime.split(" ")[1]}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default WeatherCard;