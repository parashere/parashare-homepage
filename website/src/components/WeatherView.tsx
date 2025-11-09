"use client";
import { useEffect, useState } from "react";
import { Cloud, CloudRain, Droplets, Wind, Umbrella, Loader2 } from "lucide-react";
import { Card } from "./ui/card";

interface WeatherData {
  temperature: number;
  humidity: number;
  windspeed: number;
  rainProbability: number;
  hourly: { time: string; temp: number; rain: number }[];
}

export function WeatherView() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,windspeed_10m&current_weather=true&timezone=auto`;

      const res = await fetch(url);
      const data = await res.json();

      const current = data.current_weather;
      const hourly = data.hourly;

      const nowIndex = hourly.time.findIndex((t: string) => t === current.time);
      const nextHours = Array.from({ length: 6 }, (_, i) => nowIndex + i)
        .filter((i) => i < hourly.time.length)
        .map((i) => ({
          time: new Date(hourly.time[i]).getHours() + ":00",
          temp: hourly.temperature_2m[i],
          rain: hourly.precipitation_probability[i],
        }));

      setWeather({
        temperature: current.temperature,
        humidity: hourly.relative_humidity_2m[nowIndex],
        windspeed: current.windspeed,
        rainProbability: hourly.precipitation_probability[nowIndex],
        hourly: nextHours,
      });
      setLoading(false);
    });
  }, []);

  if (loading || !weather) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-b from-[#005BAC] to-[#0073c7] text-white">
        <Loader2 className="animate-spin mr-2" /> 読み込み中...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#005BAC] to-[#0073c7] p-6 overflow-auto relative">
      <div className="flex-1 space-y-6">
        {/* 現在の天気 */}
        <div className="text-center text-white space-y-4">
          <CloudRain size={72} strokeWidth={1.5} />
          <div>
            <div className="text-[48px]">{weather.temperature}°C</div>
            <div className="text-lg opacity-90">現在の天気</div>
          </div>
        </div>

        {/* 降水確率アラート */}
        <Card className="bg-[#E50020] text-white p-4 border-none shadow-lg">
          <div className="flex items-center gap-3">
            <Umbrella size={32} />
            <div>
              <div className="text-sm opacity-90">傘の使用をおすすめします</div>
              <div className="text-lg">降水確率 {weather.rainProbability}%</div>
            </div>
          </div>
        </Card>

        {/* 詳細情報 */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/20 backdrop-blur-sm border border-white/40 p-4 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={20} />
              <span className="text-sm opacity-90">湿度</span>
            </div>
            <div className="text-xl">{weather.humidity}%</div>
          </Card>
          <Card className="bg-white/20 backdrop-blur-sm border border-white/40 p-4 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Wind size={20} />
              <span className="text-sm opacity-90">風速</span>
            </div>
            <div className="text-xl">{weather.windspeed} m/s</div>
          </Card>
        </div>

        {/* 時間別予報 */}
        <div>
          <h3 className="text-white mb-3 opacity-90 text-sm">時間別予報</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {weather.hourly.map((hour, i) => (
              <Card key={i} className="bg-white/20 backdrop-blur-sm border border-white/40 p-3 text-white min-w-[75px] flex-shrink-0 shadow-md">
                <div className="text-sm text-center space-y-2">
                  <div className="opacity-90 text-xs">{hour.time}</div>
                  <CloudRain size={22} className="mx-auto" />
                  <div className="text-sm">{hour.temp}°C</div>
                  <div className="text-xs opacity-80">{hour.rain}%</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}