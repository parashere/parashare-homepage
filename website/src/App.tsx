import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { MapView } from "./components/MapView";
import { WeatherView } from "./components/WeatherView";
import { InfoView } from "./components/InfoView";
import { MapIcon, CloudRain, Info, Umbrella, MapPin } from "lucide-react";
import { recordPageAccess } from "./lib/api";

export default function App() {
  const [activeTab, setActiveTab] = useState("map");

  useEffect(() => {
    recordPageAccess();
  }, []);

  return (
    <div className="mobile-app-shell">
      <p className="sr-only">中京大学豊田キャンパスの無料傘シェアリングサービス PARASHARE。傘の在庫、設置場所、天気、利用方法を確認できます。</p>
      <header className="app-header">
        <div className="app-brand">
          <span className="app-brand-mark"><Umbrella size={20} strokeWidth={2.3} /></span>
          <div>
            <h1>PARASHARE</h1>
            <p>雨の日を、もっと身軽に。</p>
          </div>
        </div>
        <div className="campus-chip"><MapPin size={13} />豊田キャンパス</div>
      </header>

      {/* メインコンテンツ */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="app-tabs">
        <div className="app-content">
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

        <div className="bottom-nav-wrap">
          <TabsList className="bottom-nav">
            <TabsTrigger
              value="map"
              className="bottom-nav-item"
            >
              <div className="flex flex-col items-center gap-1">
                <MapIcon size={22} />
                <span>マップ</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="weather"
              className="bottom-nav-item"
            >
              <div className="flex flex-col items-center gap-1">
                <CloudRain size={22} />
                <span>天気</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="info"
              className="bottom-nav-item"
            >
              <div className="flex flex-col items-center gap-1">
                <Info size={22} />
                <span>使い方</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

      </Tabs>
    </div>
  );
}
