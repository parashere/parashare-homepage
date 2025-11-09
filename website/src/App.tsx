import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { MapView } from "./components/MapView";
import { WeatherView } from "./components/WeatherView";
import { InfoView } from "./components/InfoView";
import { MapIcon, CloudRain, Info } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="relative h-screen flex flex-col bg-white max-w-md mx-auto shadow-xl overflow-hidden">
      {/* ヘッダー */}
      <header className="relative bg-[#B81C22] text-white p-4 shadow-md z-10">
        <h1 className="text-center">parashare</h1>
        <p className="text-center text-sm opacity-90 mt-1">傘シェアリングシステム</p>
      </header>

      {/* メインコンテンツ */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto pb-[70px]"> {/* ← フッターの高さ分余白を確保 */}
          <TabsContent value="map" className="h-full m-0">
            <MapView />
          </TabsContent>

          <TabsContent value="weather" className="h-full m-0">
            <WeatherView />
          </TabsContent>

          <TabsContent value="info" className="h-full m-0">
            <InfoView />
          </TabsContent>
        </div>

        {/* ✅ フッター（常時固定） */}
        <div className="fixed bottom-0 w-full max-w-md mx-auto z-50">
          <TabsList className="w-full rounded-none h-auto bg-[#B81C22] p-0 grid grid-cols-3 shadow-md border-t border-gray-200">
            <TabsTrigger
              value="map"
              className="rounded-none py-3.5 data-[state=active]:bg-[#E50020] data-[state=active]:text-white text-white/80 hover:text-white transition-all"
            >
              <div className="flex flex-col items-center gap-1">
                <MapIcon size={22} />
                <span className="text-xs">マップ</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="weather"
              className="rounded-none py-3.5 data-[state=active]:bg-[#E50020] data-[state=active]:text-white text-white/80 hover:text-white transition-all"
            >
              <div className="flex flex-col items-center gap-1">
                <CloudRain size={22} />
                <span className="text-xs">天気</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="info"
              className="rounded-none py-3.5 data-[state=active]:bg-[#E50020] data-[state=active]:text-white text-white/80 hover:text-white transition-all"
            >
              <div className="flex flex-col items-center gap-1">
                <Info size={22} />
                <span className="text-xs">情報</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

      </Tabs>
    </div>
  );
}