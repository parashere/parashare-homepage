"use client";

import { Card } from "./ui/card";
import { MapPin, Umbrella } from "lucide-react";
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
      <Card className="stand-card">
        
        <div className="space-y-3 relative z-10">
          <div>
            <div className="stand-card-title"><span><MapPin size={13} /></span><h3>{building.name}</h3></div>
            <div className="stand-location">
              <MapPin size={14} />
              <span className="whitespace-nowrap">{building.location}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="stock-label"><Umbrella size={14} />利用可能</span>
              <span className="stock-number">
                <strong>{building.umbrellas}</strong><small> / {building.maxUmbrellas} 本</small>
              </span>
            </div>
            
            {/* プログレスバー */}
            <div className="stock-track">
              <motion.div 
                className="stock-fill"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            
            <div className="stock-status">
              {percentage > 50 ? (
                <span className="good">余裕あり</span>
              ) : percentage > 20 ? (
                <span className="low">残りわずか</span>
              ) : (
                <span className="empty-stock">在庫少</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
