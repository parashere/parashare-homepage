"use client";

import { useEffect, useState } from "react";
import { CloudRain, Droplets, Wind, Umbrella, Loader2, MapPin, ArrowUpRight } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windspeed: number;
  rainProbability: number;
  hourly: { time: string; temp: number; rain: number }[];
}

export function WeatherView() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [place, setPlace] = useState("豊田キャンパス");

  useEffect(() => {
    const loadWeather = async (latitude: number, longitude: number) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,windspeed_10m&current_weather=true&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const current = data.current_weather;
        const hourly = data.hourly;
        const nowIndex = Math.max(0, hourly.time.findIndex((time: string) => time === current.time));
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
      } catch {
        setError("天気情報を取得できませんでした");
      }
    };

    void loadWeather(35.13, 137.17);
    navigator.geolocation.getCurrentPosition((pos) => {
      setPlace("現在地");
      void loadWeather(pos.coords.latitude, pos.coords.longitude);
    }, () => undefined, { timeout: 5000, maximumAge: 600_000 });
  }, []);

  if (!weather) {
    return (
      <div className="weather-loading">
        {error ? <><CloudRain size={34} /><strong>{error}</strong><span>ブラウザの設定をご確認ください</span></> : <><Loader2 className="animate-spin" /><strong>空模様を確認しています</strong></>}
      </div>
    );
  }

  return (
    <div className="weather-view">
      <div className="weather-location"><MapPin size={14} />{place}の天気</div>
      <section className="weather-hero">
        <div className="weather-summary">
          <CloudRain size={64} strokeWidth={1.25} />
          <div><strong>{weather.temperature}<sup>°</sup></strong><span>雨が降る可能性があります</span></div>
        </div>
        <div className="weather-stats">
          <div><Droplets size={17} /><span>湿度</span><strong>{weather.humidity}%</strong></div>
          <div><Wind size={17} /><span>風速</span><strong>{weather.windspeed} m/s</strong></div>
        </div>
      </section>

      <section className="rain-advice">
        <span className="advice-icon"><Umbrella size={24} /></span>
        <div><small>TODAY'S ADVICE</small><strong>傘を持って出かけよう</strong><span>現在の降水確率は {weather.rainProbability}% です</span></div>
        <ArrowUpRight size={18} />
      </section>

      <section className="hourly-section">
        <div className="hourly-heading"><h3>これからの天気</h3><span>6時間予報</span></div>
        <div className="hourly-list">
          {weather.hourly.map((hour, i) => (
            <div key={hour.time} className={`hour-card ${i === 0 ? "current" : ""}`}>
              <span>{i === 0 ? "現在" : hour.time}</span>
              <CloudRain size={21} />
              <strong>{hour.temp}°</strong>
              <small><Droplets size={10} />{hour.rain}%</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
