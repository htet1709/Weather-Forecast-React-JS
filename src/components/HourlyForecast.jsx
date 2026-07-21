import { useRef } from "react";

function HourlyForecast({ forecast }) {
  const sliderRef = useRef(null);

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    sliderRef.current.classList.add(
      "cursor-grabbing"
    );

    startX =
      e.pageX -
      sliderRef.current.offsetLeft;

    scrollLeft =
      sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    sliderRef.current.classList.remove(
      "cursor-grabbing"
    );
  };

  const handleMouseUp = () => {
    isDown = false;
    sliderRef.current.classList.remove(
      "cursor-grabbing"
    );
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x =
      e.pageX -
      sliderRef.current.offsetLeft;

    const walk = (x - startX) * 1.5;

    sliderRef.current.scrollLeft =
      scrollLeft - walk;
  };

  if (!forecast?.forecastday) {
    return null;
  }

  const allHours =
    forecast.forecastday.flatMap(
      (day) => day.hour
    );

  return (
    <div className="mt-10">
      <h2 className="text-white text-3xl font-bold text-center mb-6">
        次の72時間の予報
      </h2>

      <div
        ref={sliderRef}
        className="overflow-x-auto no-scrollbar cursor-grab select-none"
        onMouseDown={
          handleMouseDown
        }
        onMouseLeave={
          handleMouseLeave
        }
        onMouseUp={
          handleMouseUp
        }
        onMouseMove={
          handleMouseMove
        }
      >
        <div className="flex gap-4 w-max px-2 py-2">
          {allHours.map(
            (hour, index) => (
              <div
                key={index}
                className="min-w-35 bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-5 text-white shadow-lg hover:scale-105 transition duration-300"
              >
                {/* 時間 */}
                <h3 className="text-center font-semibold text-lg">
                  {new Date(
                    hour.time
                  ).toLocaleTimeString(
                    "ja-JP",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </h3>

                {/* アイコン */}
                <div className="flex justify-center mt-3">
                  <img
                    src={
                      hour.condition
                        .icon
                    }
                    alt="天気"
                    className="w-16 h-16"
                  />
                </div>

                {/* 気温 */}
                <h2 className="text-center text-3xl font-bold mt-2">
                  {Math.round(
                    hour.temp_c
                  )}
                  °C
                </h2>

                {/* 天気 */}
                <p className="text-center text-slate-300 text-sm mt-1">
                  {
                    hour.condition
                      .text
                  }
                </p>

                {/* 追加情報 */}
                <div className="mt-4 text-sm text-slate-200">
                  <p>
                    💧{" "}
                    {
                      hour.humidity
                    }
                    %
                  </p>

                  <p>
                    🌬️{" "}
                    {
                      hour.wind_kph
                    }
                    km/h
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;