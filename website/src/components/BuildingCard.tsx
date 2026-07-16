"use client";

import { Card } from "./ui/card";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

interface Building {
  id: string;
  name: string;
  umbrellas: number;
  maxUmbrellas: number;
  location: string;
}

export function BuildingCard({ building }: { building: Building }) {
  const percentage = (building.umbrellas / building.maxUmbrellas) * 100;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
        
        <div className="space-y-3 relative z-10">
          <div>
            <h3 className="text-[#B81C22] whitespace-nowrap">{building.name}</h3>
            <div className="flex items-center gap-1 mt-1 text-gray-600 text-sm">
              <MapPin size={14} />
              <span className="whitespace-nowrap">{building.location}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">在庫数</span>
              <span className="text-[#B81C22]">
                {building.umbrellas} / {building.maxUmbrellas}
              </span>
            </div>
            
            {/* プログレスバー */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full rounded-full bg-[#E50020]"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            
            <div className="text-xs text-center">
              {percentage > 50 ? (
                <span className="text-green-600 px-2 py-1 bg-green-50 rounded-full">在庫あり</span>
              ) : percentage > 20 ? (
                <span className="text-orange-600 px-2 py-1 bg-orange-50 rounded-full">残りわずか</span>
              ) : (
                <span className="text-red-600 px-2 py-1 bg-red-50 rounded-full">在庫少</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
