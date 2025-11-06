"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { BuildingCard } from "./BuildingCard";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import campusMap from "figma:asset/d564733cd877ea35e0b17d1bd9f3cf3fe991ff3c.png";

const buildings = [
  {
    id: 1,
    name: "第1講義棟",
    umbrellas: 12,
    maxUmbrellas: 20,
    location: "正門近く",
    mapPosition: { top: "68%", left: "31%" }, // 関係図に基づく位置
  },
  {
    id: 2,
    name: "第2講義棟",
    umbrellas: 5,
    maxUmbrellas: 15,
    location: "図書館横",
    mapPosition: { top: "56%", left: "53%" },
  },
  {
    id: 3,
    name: "第3講義棟",
    umbrellas: 18,
    maxUmbrellas: 20,
    location: "学生食堂近く",
    mapPosition: { top: "44%", left: "68%" },
  },
  {
    id: 4,
    name: "学生会館",
    umbrellas: 3,
    maxUmbrellas: 10,
    location: "中央広場",
    mapPosition: { top: "54%", left: "35%" },
  },
  {
    id: 5,
    name: "図書館",
    umbrellas: 8,
    maxUmbrellas: 15,
    location: "キャンパス東側",
    mapPosition: { top: "40%", left: "48%" },
  },
];

export function MapView() {
  const [scale, setScale] = useState(1);
  
  // ズームレベルに応じて詳細情報を表示
  const showDetails = scale > 1.5;

  return (
    <div className="flex flex-col h-full">
      {/* マップエリア */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
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
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => zoomIn()}
                  className="bg-white backdrop-blur-sm border border-gray-200 text-[#B81C22] p-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <ZoomIn size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => zoomOut()}
                  className="bg-white backdrop-blur-sm border border-gray-200 text-[#B81C22] p-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <ZoomOut size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => resetTransform()}
                  className="bg-white backdrop-blur-sm border border-gray-200 text-[#B81C22] p-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <Maximize2 size={18} />
                </motion.button>
              </div>

              {/* ズームレベルインジケーター */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-white backdrop-blur-sm border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg shadow-md">
                  <span className="text-xs">ズーム: {Math.round(scale * 100)}%</span>
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
                  {buildings.map((building) => (
                    <motion.div
                      key={building.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        top: building.mapPosition.top,
                        left: building.mapPosition.left,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: building.id * 0.1 }}
                    >
                      {/* パルスアニメーション */}
                      <motion.div
                        className="absolute inset-0 bg-[#E50020] rounded-full"
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
                        className="relative w-8 h-8 bg-gradient-to-br from-[#E50020] to-[#B81C22] rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer"
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
      <div className="relative bg-[#B81C22] px-4 py-5">
        <div className="relative">
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
            <CarouselPrevious className="left-0 bg-white border-none text-[#B81C22] hover:bg-gray-50 shadow-lg" />
            <CarouselNext className="right-0 bg-white border-none text-[#B81C22] hover:bg-gray-50 shadow-lg" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
