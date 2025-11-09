"use client";

import { Card } from "./ui/card";
import { CreditCard, MapPin, Clock, HelpCircle, BookOpen } from "lucide-react";

export function InfoView() {
  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-6 space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <p className="text-gray-600 text-sm">学生証で簡単に傘を借りられます</p>
        </div>

        {/* 使い方 */}
        <Card className="p-5 border border-gray-200 shadow-md bg-white">
          <h3 className="text-[#B81C22] mb-4 flex items-center gap-2">
            <BookOpen size={20} />
            使い方
          </h3>
          <div className="space-y-4">
            {[
              { step: 1, title: "貸し出し場所を確認", desc: "マップから最寄りの貸し出し場所を探します" },
              { step: 2, title: "学生証をタッチ", desc: "貸し出しスタンドのリーダーに学生証をかざします" },
              { step: 3, title: "傘を受け取る", desc: "ロックが解除されるので傘を取り出します" },
              { step: 4, title: "返却する", desc: "使用後は任意の返却場所に返却してください" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="bg-[#E50020] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">
                  {item.step}
                </div>
                <div>
                  <div className="text-sm">{item.title}</div>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* サービス情報 */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border border-gray-200 shadow-md bg-white">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="bg-[#005BAC]/10 p-3 rounded-full">
                  <CreditCard size={24} className="text-[#005BAC]" />
                </div>
              </div>
              <div className="text-sm">無料</div>
              <p className="text-xs text-gray-600">学生証があればOK</p>
            </div>
          </Card>
          
          <Card className="p-4 border border-gray-200 shadow-md bg-white">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="bg-[#005BAC]/10 p-3 rounded-full">
                  <Clock size={24} className="text-[#005BAC]" />
                </div>
              </div>
              <div className="text-sm">24時間</div>
              <p className="text-xs text-gray-600">いつでも利用可能</p>
            </div>
          </Card>
        </div>

        {/* 貸し出し場所 */}
        <Card className="p-5 border border-gray-200 shadow-md bg-white">
          <h3 className="text-[#B81C22] mb-3 flex items-center gap-2">
            <MapPin size={20} />
            貸し出し・返却場所
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "第1講義棟 (正門近く)",
              "第2講義棟 (図書館横)",
              "第3講義棟 (学生食堂近く)",
              "学生会館 (中央広場)",
              "図書館 (キャンパス東側)",
            ].map((location, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E50020] rounded-full"></div>
                {location}
              </li>
            ))}
          </ul>
        </Card>

        {/* 注意事項 */}
        <Card className="p-5 bg-amber-50 border border-amber-200 shadow-md">
          <h3 className="text-amber-900 mb-3 flex items-center gap-2">
            <HelpCircle size={20} />
            注意事項
          </h3>
          <ul className="space-y-2 text-sm text-amber-900">
            {[
              "借りた傘は必ず返却してください",
              "破損した場合は速やかにご連絡ください",
              "1人1本まで貸し出し可能です",
            ].map((note, index) => (
              <li key={index} className="flex gap-2">
                <span>•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
