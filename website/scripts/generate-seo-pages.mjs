import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://chukyo-parashare.vercel.app";
const pages = [
  {
    path: "/",
    title: "PARASHARE | 中京大学の無料傘シェアリング",
    description: "PARASHAREは中京大学豊田キャンパスで学生証を使って無料利用できる傘シェアリングサービスです。傘の在庫、設置場所、利用方法を確認できます。",
    heading: "中京大学豊田キャンパスの無料傘シェアリング PARASHARE",
    text: "急な雨の日も、学生証ひとつで傘を借りられます。現在は豊田キャンパス11号館で貸出・返却できます。",
    priority: "1.0",
  },
  {
    path: "/map/",
    title: "傘の在庫と設置場所 | PARASHARE",
    description: "中京大学豊田キャンパスにあるPARASHAREの傘の在庫とスタンド設置場所をリアルタイムで確認できます。",
    heading: "中京大学豊田キャンパスの傘を探す",
    text: "11号館に設置された傘シェアリングスタンドの最新在庫を確認できます。",
    priority: "0.9",
  },
  {
    path: "/weather/",
    title: "豊田キャンパスの天気 | PARASHARE",
    description: "中京大学豊田キャンパス周辺の天気と降水情報を確認し、PARASHAREの傘を探せます。",
    heading: "中京大学豊田キャンパス周辺の天気",
    text: "現在の天気と雨の予報を確認できます。急な雨のときはPARASHAREをご利用ください。",
    priority: "0.7",
  },
  {
    path: "/how-to-use/",
    title: "傘の借り方・返し方 | PARASHARE利用方法",
    description: "中京大学の無料傘シェアリングPARASHAREの借り方と返し方を説明します。学生証を使って簡単に利用できます。",
    heading: "PARASHAREの利用方法",
    text: "スタンドを探し、学生証をカードリーダーへかざして傘を借ります。利用後はPARASHAREのスタンドへ返却してください。",
    priority: "0.9",
  },
  {
    path: "/locations/toyota-campus/",
    title: "豊田キャンパスの傘スタンド設置場所 | PARASHARE",
    description: "PARASHAREの設置場所は中京大学豊田キャンパス11号館エントランスです。無料で傘の貸出と返却ができます。",
    heading: "豊田キャンパスの傘スタンド設置場所",
    text: "現在は11号館エントランスで利用できます。利用料金は無料で、学生証が必要です。",
    priority: "0.9",
  },
  {
    path: "/faq/",
    title: "よくある質問 | PARASHARE",
    description: "PARASHAREの料金、利用条件、設置場所、傘の貸出・返却についてのよくある質問をまとめています。",
    heading: "PARASHAREについてのよくある質問",
    text: "利用料金は無料です。中京大学の学生証を使い、現在は豊田キャンパス11号館で利用できます。",
    priority: "0.8",
  },
  {
    path: "/about/",
    title: "PARASHAREについて | 中京大学の傘シェアリング",
    description: "PARASHAREは突然の雨によるキャンパス内の困りごとを解決する、中京大学豊田キャンパスの傘シェアリングサービスです。",
    heading: "PARASHAREについて",
    text: "キャンパス内で傘を共有し、必要なときに必要な人が利用できる仕組みを目指しています。",
    priority: "0.8",
  },
  {
    path: "/news/",
    title: "お知らせ | PARASHARE",
    description: "PARASHAREのサービス運用、設置場所、ホームページ更新に関する最新のお知らせです。",
    heading: "PARASHAREからのお知らせ",
    text: "豊田キャンパス11号館の在庫公開やホームページの更新情報を掲載します。",
    priority: "0.7",
  },
];

const links = pages
  .filter((page) => page.path !== "/weather/")
  .map((page) => `<a href="${page.path}">${page.heading}</a>`)
  .join(" ");

function html(page) {
  const url = `${origin}${page.path}`;
  const structuredData = page.path === "/"
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "PARASHARE",
        alternateName: "パラシェア",
        url,
        description: page.description,
        areaServed: { "@type": "Place", name: "中京大学 豊田キャンパス" },
        provider: { "@type": "Organization", name: "PARASHARE" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.heading,
        url,
        description: page.description,
        isPartOf: { "@type": "WebSite", name: "PARASHARE", url: `${origin}/` },
      };

  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#20845a" />
    <meta name="description" content="${page.description}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="PARASHARE" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/favicon.svg" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/favicon.svg" />
    <link rel="manifest" href="/site.webmanifest" />
    <title>${page.title}</title>
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  </head>
  <body>
    <div id="root"><main><h1>${page.heading}</h1><p>${page.text}</p><nav>${links}</nav></main></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

for (const page of pages) {
  const target = page.path === "/" ? resolve(root, "index.html") : resolve(root, page.path.slice(1), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html(page), "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${origin}${page.path}</loc>
    <lastmod>2026-07-17</lastmod>
    <changefreq>${page.path === "/news/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(root, "public/sitemap.xml"), sitemap, "utf8");
