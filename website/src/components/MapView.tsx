"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { BuildingCard } from "./BuildingCard";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, LocateFixed, Navigation, Umbrella, Activity, RotateCcw, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import campusMap from "figma:asset/d564733cd877ea35e0b17d1bd9f3cf3fe991ff3c.png";
import { fetchPublicDashboard, fetchStands, type PublicDashboard } from "../lib/api";

const mapPositions: Record<string, { top: string; left: string }> = {
  "11号館": { top: "51%", left: "59.3%" },
};

interface Building {
  id: string;
  name: string;
  umbrellas: number;
  maxUmbrellas: number;
  location: string;
  mapPosition: { top: string; left: string };
}

export function MapView() {
  const [scale, setScale] = useState(1);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [dashboard, setDashboard] = useState<PublicDashboard | null>(null);
  const [standsLoaded, setStandsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = () => {
      fetchStands(controller.signal)
        .then((stands) => {
          setBuildings(
            stands.map((stand) => ({
              id: stand.stand_id,
              name: stand.name,
              umbrellas: stand.available,
              maxUmbrellas: stand.capacity,
              location: stand.name,
              mapPosition: mapPositions[stand.name] || { top: "50%", left: "50%" },
            })),
          );
          setError(null);
          setStandsLoaded(true);
        })
        .catch((reason: unknown) => {
          if (!controller.signal.aborted) {
            setError(reason instanceof Error && /\(\d{3}\)/.test(reason.message) ? reason.message : "スタンド情報を取得できませんでした");
            setStandsLoaded(true);
          }
        });
      fetchPublicDashboard(controller.signal).then(setDashboard).catch(() => undefined);
    };
    load();
    const timer = window.setInterval(load, 30_000);
    return () => { window.clearInterval(timer); controller.abort(); };
  }, []);
  
  // ズームレベルに応じて詳細情報を表示
  const showDetails = scale > 1.5;
  const available = dashboard?.available ?? buildings.reduce((sum, building) => sum + building.umbrellas, 0);
  const capacity = dashboard?.total_capacity ?? buildings.reduce((sum, building) => sum + building.maxUmbrellas, 0);
  const stockRate = capacity ? Math.round(available / capacity * 100) : 0;

  return (
    <div className="map-view">
      <div className="section-heading">
        <div><span className="section-kicker">NEARBY STANDS</span><h2>傘を探す</h2></div>
        <span className="availability-pill"><span />リアルタイム</span>
      </div>
      <section className="live-overview">
        <div className="live-primary">
          <span className="live-primary-icon"><Umbrella size={22} /></span>
          <div><small>今すぐ借りられる傘</small><strong>{available}<em>本</em></strong></div>
          <span className="stock-rate">{stockRate}%</span>
        </div>
        <div className="live-metrics">
          <div><Activity size={15} /><span>貸出中</span><strong>{dashboard?.active_rentals ?? "—"}<small>本</small></strong></div>
          <div><ArrowUpRight size={15} /><span>今日の利用</span><strong>{dashboard ? dashboard.rentals_today + dashboard.returns_today : "—"}<small>回</small></strong></div>
        </div>
      </section>
      {/* マップエリア */}
      <div className="map-canvas">
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={4}
          onTransformed={(ref) => {
            setScale(ref.state.scale);
          }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* コントロールボタン */}
              <div className="map-controls">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => zoomIn()}
                  className="map-control-button"
                >
                  <ZoomIn size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => zoomOut()}
                  className="map-control-button"
                >
                  <ZoomOut size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => resetTransform()}
                  className="map-control-button"
                >
                  <LocateFixed size={18} />
                </motion.button>
              </div>

              {/* ズームレベルインジケーター */}
              <div className="map-scale">
                <div>
                  <Navigation size={12} />
                  <span>{Math.round(scale * 100)}%</span>
                </div>
              </div>

              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* マップ画像 */}
                  <img 
                    src={campusMap}
                    alt="キャンパスマップ"
                    className="max-w-full max-h-full object-contain"
                  />
                  
                  {/* マップ上のマーカー */}
                  {buildings.map((building, index) => (
                    <motion.div
                      key={building.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        top: building.mapPosition.top,
                        left: building.mapPosition.left,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* パルスアニメーション */}
                      <motion.div
                        className="map-marker-pulse"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{ width: "32px", height: "32px" }}
                      />
                      
                      {/* メインマーカー */}
                      <motion.div
                        className="map-marker"
                        whileHover={{ scale: 1.15 }}
                      >
                        <span className="text-white text-xs z-10">{building.umbrellas}</span>
                      </motion.div>

                      {/* 詳細情報 - ズーム時のみ表示 */}
                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 3 }}
                            className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 pointer-events-none z-50"
                          >
                            <div className="bg-white border border-gray-300 rounded px-1.5 py-1 shadow-md">
                              <div className="text-gray-800 whitespace-nowrap text-center">
                                <div className="text-[10px] text-[#B81C22]">{building.name}</div>
                                <div className="text-[9px] text-gray-600">{building.umbrellas}/{building.maxUmbrellas}</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

      </div>

      {/* カルーセルエリア */}
      <div className="stand-drawer">
        <div className="stand-drawer-heading"><span>利用できるスタンド</span><small>{buildings.length}か所</small></div>
        <div className="relative">
          {error && <div className="stand-error"><span>!</span><div><strong>{error}</strong><small>時間をおいてもう一度お試しください</small></div></div>}
          {!error && buildings.length === 0 && (
            <p className="stand-empty-message">{standsLoaded ? "スタンドはただいま準備中です" : "スタンド情報を読み込み中..."}</p>
          )}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {buildings.map((building) => (
                <CarouselItem key={building.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-3/4 md:basis-1/2 lg:basis-1/3">
                  <BuildingCard building={building} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-nav left-0" />
            <CarouselNext className="carousel-nav right-0" />
          </Carousel>
          {dashboard && (
            <section className="activity-feed">
              <div className="activity-heading"><div><Activity size={15} /><strong>最近の動き</strong></div><span>30秒ごとに更新</span></div>
              {dashboard.recent_activity.length > 0 ? (
                <div className="activity-list">
                  {dashboard.recent_activity.slice(0, 4).map((activity, index) => (
                    <div className="activity-row" key={`${activity.event_type}-${activity.occurred_at}-${index}`}>
                      <span className={`activity-icon ${activity.event_type}`}>
                        {activity.event_type === "rent" ? <Umbrella size={15} /> : <RotateCcw size={15} />}
                      </span>
                      <div><strong>{activity.event_type === "rent" ? "傘が貸し出されました" : "傘が返却されました"}</strong><small>{activity.stand_name}</small></div>
                      <time>{new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit" }).format(new Date(activity.occurred_at))}</time>
                    </div>
                  ))}
                </div>
              ) : <div className="activity-empty">今日最初の利用を待っています</div>}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
