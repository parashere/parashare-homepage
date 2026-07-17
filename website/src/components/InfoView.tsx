"use client";

import { CreditCard, MapPin, Clock, HelpCircle, BookOpen, Umbrella, ArrowDown, ShieldCheck } from "lucide-react";

export function InfoView() {
  const steps = [
    { step: "01", title: "スタンドを探す", desc: "マップで傘の在庫を確認", icon: MapPin },
    { step: "02", title: "学生証をタッチ", desc: "リーダーに学生証をかざす", icon: CreditCard },
    { step: "03", title: "傘を受け取る", desc: "ロック解除後に傘を取り出す", icon: Umbrella },
    { step: "04", title: "好きな場所で返却", desc: "最寄りのスタンドへ返却", icon: ArrowDown },
  ];

  return (
    <div className="info-view">
      <div className="info-intro">
        <span className="section-kicker">HOW TO USE</span>
        <h2>学生証ひとつで、<br />かんたん傘レンタル。</h2>
        <p>急な雨でも大丈夫。キャンパス内のスタンドから<br />無料で傘を借りられます。</p>
      </div>

      <section className="steps-panel">
        <div className="panel-heading"><BookOpen size={18} /><h3>使い方</h3><span>4 STEPS</span></div>
        <div className="steps-list">
          {steps.map(({ step, title, desc, icon: Icon }, index) => (
            <div className="step-row" key={step}>
              <span className="step-number">{step}</span>
              <span className="step-icon"><Icon size={19} /></span>
              <div><strong>{title}</strong><p>{desc}</p></div>
              {index < steps.length - 1 && <span className="step-line" />}
            </div>
          ))}
        </div>
      </section>

      <div className="service-grid">
        <div><span><CreditCard size={20} /></span><strong>利用料金 0円</strong><small>学生証があればOK</small></div>
        <div><span><Clock size={20} /></span><strong>24時間利用可能</strong><small>いつでも貸出・返却</small></div>
      </div>

      <section className="location-panel">
        <div><span><MapPin size={18} /></span><div><small>貸出・返却スポット</small><strong>11号館 エントランス</strong></div></div>
        <span className="open-chip">OPEN</span>
      </section>

      <section className="notice-panel">
        <HelpCircle size={19} />
        <div><strong>ご利用にあたって</strong><p>傘は1人1本まで。使用後は必ずスタンドへ返却してください。破損した場合は大学窓口へご連絡ください。</p></div>
      </section>

      <section className="notice-panel">
        <ShieldCheck size={19} />
        <div><strong>アクセス情報の利用</strong><p>サービス改善と不正利用対策のため、閲覧日時、ページ、参照元、IPアドレス、端末・ブラウザ情報、国・地域情報を90日間保存します。ブラウザのDNT/GPC設定が有効な場合は記録しません。</p></div>
      </section>
    </div>
  );
}
