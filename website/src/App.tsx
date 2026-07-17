import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  CloudRain,
  CreditCard,
  HelpCircle,
  Info,
  MapIcon,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Umbrella,
  X,
} from "lucide-react";
import { fetchPublicDashboard, recordPageAccess, type PublicDashboard } from "./lib/api";

const MapView = lazy(() => import("./components/MapView").then((module) => ({ default: module.MapView })));
const WeatherView = lazy(() => import("./components/WeatherView").then((module) => ({ default: module.WeatherView })));

const navigation = [
  { href: "/map/", label: "傘を探す" },
  { href: "/how-to-use/", label: "利用方法" },
  { href: "/locations/toyota-campus/", label: "設置場所" },
  { href: "/faq/", label: "よくある質問" },
  { href: "/about/", label: "PARASHAREについて" },
  { href: "/news/", label: "お知らせ" },
];

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

export default function App() {
  const path = normalizePath(window.location.pathname);

  useEffect(() => {
    recordPageAccess();
  }, []);

  if (path === "/map" || path === "/weather") return <ServiceApp view={path.slice(1) as "map" | "weather"} />;
  if (path === "/how-to-use") return <HowToUsePage />;
  if (path === "/locations/toyota-campus") return <LocationPage />;
  if (path === "/faq") return <FaqPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/news") return <NewsPage />;
  return <LandingPage />;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="site-logo" href="/" aria-label="PARASHARE トップページ"><span><Umbrella size={22} /></span><div><strong>PARASHARE</strong><small>CHUKYO UNIVERSITY</small></div></a>
    <button className="site-menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? "メニューを閉じる" : "メニューを開く"}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? "site-nav open" : "site-nav"} aria-label="メインナビゲーション">
      {navigation.slice(1).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      <a className="site-nav-cta" href="/map/"><MapPin size={16} />傘を探す</a>
    </nav>
  </header>;
}

function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer-main"><a className="site-logo footer-logo" href="/"><span><Umbrella size={22} /></span><div><strong>PARASHARE</strong><small>雨の日を、もっと身軽に。</small></div></a><nav aria-label="フッターナビゲーション">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></div><div className="site-footer-bottom"><span>中京大学 豊田キャンパス</span><span>© 2026 PARASHARE</span></div></footer>;
}

function LandingPage() {
  const [dashboard, setDashboard] = useState<PublicDashboard | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetchPublicDashboard(controller.signal).then(setDashboard).catch(() => undefined);
    return () => controller.abort();
  }, []);

  return <div className="website-shell">
    <SiteHeader />
    <main>
      <section className="landing-hero">
        <div className="hero-copy"><p className="site-eyebrow"><Sparkles size={15} />中京大学 豊田キャンパス</p><h1>急な雨の日も、<br /><em>傘をもっと身近に。</em></h1><p className="hero-description">PARASHARE（パラシェア）は、学生証ひとつで無料利用できる中京大学の傘シェアリングサービスです。</p><div className="hero-actions"><a className="site-primary-button" href="/map/"><MapPin size={18} />今すぐ傘を探す <ArrowRight size={17} /></a><a className="site-secondary-button" href="/how-to-use/">利用方法を見る</a></div><div className="hero-trust"><span><CheckCircle2 />利用料金0円</span><span><CheckCircle2 />学生証で利用</span><span><CheckCircle2 />貸出・返却が簡単</span></div></div>
        <div className="hero-status-card"><div className="hero-card-top"><span className="live-dot" />LIVE STATUS<small>豊田キャンパス</small></div><div className="hero-availability"><span><Umbrella /></span><div><small>今すぐ利用できる傘</small><strong>{dashboard?.available ?? "—"}<em>本</em></strong></div></div><div className="hero-stat-grid"><div><small>設置拠点</small><strong>{dashboard?.stands ?? "—"}<em>か所</em></strong></div><div><small>本日の貸出</small><strong>{dashboard?.rentals_today ?? "—"}<em>回</em></strong></div></div><a href="/map/">リアルタイム在庫を確認 <ArrowRight size={15} /></a></div>
      </section>

      <section className="landing-section quick-intro"><div className="section-copy"><p className="site-eyebrow">ABOUT THE SERVICE</p><h2>キャンパスの傘を、<br />必要なときに必要な人へ。</h2></div><p>突然の雨で傘を持っていないときも、キャンパス内のスタンドから借りて、利用後に返却できます。使い捨て傘を減らしながら、学生生活を少し便利にするサービスです。</p></section>

      <section className="landing-section"><SectionTitle eyebrow="HOW TO USE" title="3ステップで、すぐに使えます" description="アプリの登録や現金は必要ありません。" /><div className="feature-card-grid"><FeatureCard number="01" icon={<MapPin />} title="スタンドを探す" text="ホームページのマップで、傘の在庫と設置場所を確認します。" /><FeatureCard number="02" icon={<CreditCard />} title="学生証をタッチ" text="スタンドのリーダーへ学生証をかざして認証します。" /><FeatureCard number="03" icon={<Umbrella />} title="借りて、返却する" text="ロック解除後に傘を受け取り、使用後はスタンドへ返却します。" /></div><div className="section-link-row"><a href="/how-to-use/">詳しい利用方法を見る <ArrowRight size={16} /></a></div></section>

      <section className="landing-section location-highlight"><div className="location-copy"><p className="site-eyebrow">LOCATION</p><h2>現在は11号館で<br />利用できます。</h2><p>豊田キャンパス11号館のスタンドで貸出・返却できます。在庫はリアルタイムで確認できます。</p><div><a className="site-primary-button" href="/locations/toyota-campus/"><MapPin size={17} />設置場所を見る</a><a className="text-link" href="/map/">在庫を見る <ArrowRight size={15} /></a></div></div><div className="location-visual"><span className="location-pin"><MapPin /></span><div><small>CHUKYO UNIVERSITY</small><strong>豊田キャンパス</strong><p>11号館 エントランス</p></div></div></section>

      <section className="landing-section"><SectionTitle eyebrow="WHY PARASHARE" title="雨の日の小さな困りごとを解決" /><div className="value-grid"><ValueCard icon={<ShieldCheck />} title="無料で利用" text="学生証があれば、利用料金はかかりません。" /><ValueCard icon={<Clock3 />} title="すぐに確認" text="傘の在庫をホームページからリアルタイムで確認できます。" /><ValueCard icon={<CloudRain />} title="急な雨に対応" text="傘を持っていない日の移動をサポートします。" /><ValueCard icon={<Sparkles />} title="傘をシェア" text="キャンパス内で傘を共有し、使い捨てを減らします。" /></div></section>

      <section className="landing-section faq-preview"><SectionTitle eyebrow="FAQ" title="よくある質問" /><div className="faq-preview-list"><details open><summary>利用料金はかかりますか？</summary><p>いいえ。PARASHAREは無料で利用できます。</p></details><details><summary>利用には何が必要ですか？</summary><p>中京大学の学生証を使用します。スタンドの案内に沿って学生証をかざしてください。</p></details><details><summary>どこで借りられますか？</summary><p>現在は豊田キャンパス11号館のスタンドで利用できます。</p></details></div><div className="section-link-row"><a href="/faq/">すべての質問を見る <ArrowRight size={16} /></a></div></section>

      <section className="landing-cta"><div><p className="site-eyebrow">READY TO USE?</p><h2>傘の在庫を確認してみましょう。</h2><p>豊田キャンパスの利用状況をリアルタイムで確認できます。</p></div><a className="site-primary-button light" href="/map/"><MapPin size={18} />傘を探す <ArrowRight size={17} /></a></section>
    </main>
    <SiteFooter />
  </div>;
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="site-section-title"><p className="site-eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

function FeatureCard({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) {
  return <article className="feature-card"><span className="feature-number">{number}</span><span className="feature-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>;
}

function ValueCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="value-card"><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>;
}

function ServiceApp({ view }: { view: "map" | "weather" }) {
  return <div className="mobile-app-shell">
    <header className="app-header"><a className="app-brand" href="/"><span className="app-brand-mark"><Umbrella size={20} strokeWidth={2.3} /></span><div><h1>PARASHARE</h1><p>雨の日を、もっと身軽に。</p></div></a><div className="campus-chip"><MapPin size={13} />豊田キャンパス</div></header>
    <div className="app-tabs"><div className="app-content"><Suspense fallback={<div className="service-loading"><span className="live-dot" /><strong>サービス情報を読み込んでいます</strong></div>}>{view === "map" ? <MapView /> : <WeatherView />}</Suspense></div><div className="bottom-nav-wrap"><nav className="bottom-nav" aria-label="サービスメニュー"><a className={view === "map" ? "bottom-nav-item active" : "bottom-nav-item"} href="/map/"><MapIcon size={20} /><span>マップ</span></a><a className={view === "weather" ? "bottom-nav-item active" : "bottom-nav-item"} href="/weather/"><CloudRain size={20} /><span>天気</span></a><a className="bottom-nav-item" href="/how-to-use/"><Info size={20} /><span>使い方</span></a></nav></div></div>
  </div>;
}

function ContentLayout({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: React.ReactNode }) {
  return <div className="website-shell"><SiteHeader /><main><header className="content-hero"><p className="site-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lead}</p></header><div className="content-body">{children}</div><section className="content-cta"><div><h2>傘の在庫を確認する</h2><p>豊田キャンパスの最新状況を確認できます。</p></div><a className="site-primary-button" href="/map/"><MapPin size={17} />傘を探す</a></section></main><SiteFooter /></div>;
}

function HowToUsePage() {
  return <ContentLayout eyebrow="HOW TO USE" title="PARASHAREの利用方法" lead="学生証ひとつで、傘を無料で借りられます。初めての方もスタンドの案内に沿って利用できます。"><section className="content-section"><h2>傘を借りる</h2><div className="content-step-list"><FeatureCard number="01" icon={<MapPin />} title="スタンドと在庫を確認" text="ホームページのマップで、利用できる傘があるか確認します。" /><FeatureCard number="02" icon={<CreditCard />} title="学生証をかざす" text="スタンドのカードリーダーへ学生証をかざして認証します。" /><FeatureCard number="03" icon={<Umbrella />} title="傘を受け取る" text="案内に従い、ロックが解除された傘を受け取ります。" /></div></section><section className="content-section soft-section"><h2>傘を返す</h2><ol className="return-list"><li><span>1</span><div><strong>返却できるスタンドへ向かう</strong><p>現在は豊田キャンパス11号館で返却できます。</p></div></li><li><span>2</span><div><strong>学生証をかざす</strong><p>スタンドの案内に従って返却操作を開始します。</p></div></li><li><span>3</span><div><strong>傘を所定の位置へ戻す</strong><p>返却完了の表示を確認してください。</p></div></li></ol></section><aside className="content-note"><HelpCircle /><div><strong>困ったときは</strong><p>スタンドの画面に表示される案内を確認してください。破損や動作不良がある場合は、無理に操作せず大学窓口へご連絡ください。</p></div></aside></ContentLayout>;
}

function LocationPage() {
  return <ContentLayout eyebrow="LOCATION" title="豊田キャンパスの設置場所" lead="現在、PARASHAREは中京大学豊田キャンパス11号館で利用できます。"><section className="location-detail-card"><div className="location-detail-map"><span><MapPin /></span><small>TOYOTA CAMPUS</small><strong>11号館</strong></div><div className="location-detail-copy"><span className="open-label">利用可能</span><h2>11号館 エントランス</h2><p>貸出と返却の両方に対応しています。利用前にリアルタイム在庫をご確認ください。</p><dl><div><dt>キャンパス</dt><dd>中京大学 豊田キャンパス</dd></div><div><dt>設置場所</dt><dd>11号館 エントランス</dd></div><div><dt>利用料金</dt><dd>無料</dd></div><div><dt>必要なもの</dt><dd>学生証</dd></div></dl><a className="site-primary-button" href="/map/"><MapIcon size={17} />マップと在庫を見る</a></div></section></ContentLayout>;
}

const questions = [
  ["利用料金はかかりますか？", "いいえ。PARASHAREは無料で利用できます。"],
  ["誰が利用できますか？", "中京大学の学生証を使って認証します。"],
  ["どこで借りられますか？", "現在は豊田キャンパス11号館のスタンドで利用できます。"],
  ["傘の在庫はどこで分かりますか？", "「傘を探す」ページで、スタンドの在庫をリアルタイムに確認できます。"],
  ["傘はどこへ返せばよいですか？", "PARASHAREのスタンドへ返却してください。現在の設置場所は11号館です。"],
  ["一度に何本借りられますか？", "傘は1人1本まで利用できます。"],
  ["傘が破損していた場合は？", "無理に使用せず、大学窓口へご連絡ください。"],
  ["アクセス情報は何に使われますか？", "サービス改善と不正利用対策のために利用し、90日後に自動削除します。DNT/GPCが有効な場合は記録しません。"],
];

function FaqPage() {
  return <ContentLayout eyebrow="FREQUENTLY ASKED QUESTIONS" title="よくある質問" lead="PARASHAREの利用条件や貸出・返却について、よくある質問をまとめています。"><section className="full-faq-list">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</section></ContentLayout>;
}

function AboutPage() {
  return <ContentLayout eyebrow="ABOUT PARASHARE" title="雨の日を、もっと身軽に。" lead="PARASHAREは、中京大学豊田キャンパスで利用できる傘シェアリングサービスです。"><section className="about-story"><div><p className="site-eyebrow">OUR PURPOSE</p><h2>突然の雨に困らない<br />キャンパスを目指して。</h2></div><div><p>傘を持っていない日に雨が降ると、移動を諦めたり、使い捨ての傘を購入したりすることがあります。PARASHAREは、キャンパス内で傘を共有することで、その小さな困りごとを解決します。</p><p>学生証による認証と、スタンドの在庫をリアルタイムに確認できる仕組みを組み合わせ、借りやすく返しやすいサービスを目指しています。</p></div></section><section className="about-values"><ValueCard icon={<Umbrella />} title="利便性" text="必要なときに、キャンパス内ですぐ傘を借りられます。" /><ValueCard icon={<Sparkles />} title="シェア" text="1本の傘を多くの人で共有し、無駄を減らします。" /><ValueCard icon={<ShieldCheck />} title="安心" text="学生証認証とリアルタイム管理で運用します。" /></section></ContentLayout>;
}

function NewsPage() {
  return <ContentLayout eyebrow="NEWS" title="お知らせ" lead="PARASHAREの運用状況やホームページの更新情報をお知らせします。"><section className="news-list"><article><time dateTime="2026-07-17">2026.07.17</time><span>サイト更新</span><h2>ホームページをリニューアルしました</h2><p>利用方法、設置場所、よくある質問など、PARASHAREを初めて利用する方に向けた情報を追加しました。</p></article><article><time dateTime="2026-07-16">2026.07.16</time><span>サービス</span><h2>豊田キャンパス11号館の在庫を公開しました</h2><p>ホームページから、スタンドの傘の在庫と利用状況をリアルタイムで確認できるようになりました。</p></article></section></ContentLayout>;
}
