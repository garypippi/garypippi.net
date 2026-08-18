# CLAUDE.md

静的エクスポート (`output: 'export'`) された Next.js App Router のブログ。**記事コンテンツは別リポジトリにあり、このリポジトリはレンダラーのみ**。`BLOG_PATH` がそのチェックアウトを指す (CI ではビルド前に `./blog` へ `--depth 1` でクローン)。

## コマンド

```bash
npm run dev          # next dev (.env.local に BLOG_PATH が必要)
npm run build        # -> ./out (BLOG_PATH と HOST_URL が必要)
npm run lint         # eslint . (flat config: eslint.config.mjs)
npm test             # jest (spec/ 配下、Markdown まわりのみ)
npx tcm lib app      # CSS Modules の型を再生成 (後述、必須)
npx stylelint "lib/**/*.css" "app/**/*.css"   # スクリプトなし
```

テストは `spec/` に置く (ts-jest + jsdom)。**カバーしているのは Markdown のパースとレンダリングだけ**で、データ層 (`getPost*`) やページのルートにはテストがない。CI のデプロイゲートが `npm run test` を実行するので、落ちるとデプロイされない。

jest の設定で押さえておくべき点が3つある。

- mdast / micromark / smol-toml は **ESM 専用**なので、`transformIgnorePatterns` でこれらだけ node_modules 内でも変換対象にしている。依存を足して `Unexpected token 'export'` が出たら、そのパッケージを `esmPackages` に追加する。
- CSS Modules は `spec/cssModuleStub.js` (キー名をそのまま返す Proxy) に差し替えている。`__esModule` に truthy を返すと esModuleInterop の default 解決が壊れるので、そこだけ `false` を返している。
- `spec/setupEnv.ts` が `IMAGE_PATH` / `VIDEO_PATH` を入れ、jsdom に足りない `TextEncoder` / `TextDecoder` を補う (`react-dom/server` が読み込み時に触るため)。

コンポーネントは `renderToStaticMarkup` で文字列にして検証している (静的サイトなので最終成果物に一致する)。`@testing-library` は入れていない。

stylelint に `**/*.css` を渡すと `out/_next` の圧縮 CSS まで拾って大量に誤検出する。上記のようにソースだけを指定する。

`cli/` (`npm run build:cli` → `cli/index.mjs add <dir>`) は**実質デッドコード**。記事作成は blog リポジトリ側の `cli.sh` で行われており、`build:cli` は CI からも外れている。

## 環境変数

すべて `lib/environments.ts` 経由。`.env` にキーの一覧、実値は `.env.local` (gitignore)。**CI は `.env.local` を作らず、GitHub Actions の変数を job の `env:` に直接置いている** (`deploy.yml`)。サーバーサイドは `BLOG_PATH` と `HOST_URL` のみ、残りは `NEXT_PUBLIC_*` としてクライアントバンドルに展開される。

## 記事のフォーマットとデータ層

`+++` で区切られた TOML フロントマターを持つ Markdown。パスは `/\d{14}\/.+\.md$` にマッチする形 (`yyyyMMddHHmmss` ディレクトリ / 32桁hex のファイル名)。`.md` を除いたファイル名が記事 ID で、そのままルート (`/<id>`) になる。

```
+++
title = ""
date = 2024-01-01T00:00:00+09:00
tags = []
+++
```

`lib/get*.ts` がデータ層のすべてで、`fs` を触るためビルド時のみ呼べる。

- `getPostPaths` は `BLOG_PATH` を再帰走査し、上の正規表現で絞って結果を**逆順にする** — 一覧が新しい順なのはこの逆順化によるもので、日付ソートではない。
- `getPost` は正規表現でフロントマターを分割し `smol-toml` でパースする。`attr.date` は型宣言では `string` だが、実際には `TomlDate` (Date のサブクラス) が入る。
- それ以外 (`getPosts`、`getPostById`、`getPostsByTag`、`getPostsByMonth`、`getPostTags`、`getPostMonths`、`getPostsByPage`) はすべて**全記事**を読み直してパースし直す。キャッシュはない。
- `attr.draft` は型に存在するが、これでフィルタしている箇所はない。

## Markdown のレンダリング

`getMdast` は `mdast-util-from-markdown` でパースするだけの同期関数。unified / remark は使わず、mdast を書き換えるプラグインも持たない。GFM はテーブルのみ有効で、取り消し線・脚注・autolink literal などは**入れていない**。

`lib/components/Post/index.tsx` は `node.type` の再帰的な switch で `Post/Markdown/*` へディスパッチし、**未対応の型では例外を投げる** (握り潰さない)。対応済みは `root` / `paragraph` / `text` / `list` / `listItem` / `image` / `heading` / `code` / `link` / `inlineCode` / `blockquote` / `table` の12種のみ。**`strong` / `emphasis` は未対応なので、記事で `**太字**` を使うとビルドが落ちる**。記法を足すにはコンポーネントを作り、`Post/Markdown/index.ts` から再エクスポートし、`case` を追加する。

例外が2つ。`tableRow` / `tableCell` は switch を通らない — `<th>` と `<td>` の出し分けとカラムの寄せ (`node.align`) には行の位置という文脈が要るので、`Table` が `thead` / `tbody` を組み立てて `TableRow` → `TableCell` を直接呼び、セルの子だけが `Post` に戻る。`Video` にも `case` はなく `image` の分岐から呼ばれる。

動画は**独自記法ではなく画像記法**で書く。`![clip](clip.mp4)` のように `image` ノードの `url` が `.mp4` / `.webm` / `.mov` (大文字可) で終われば `Video` が `<video>` を、それ以外は `Image` が `<img>` を返す。分岐は `Post/index.tsx` の `isVideoUrl`。`!` なしの `[これ](clip.mp4)` は普通のリンクなので動画へのリンクも書ける。以前あった `see?[clip](foo.mp4)` という独自記法は、`root` 直下の段落しか走査せずリスト・引用・テーブルセル内で動かなかったため廃止した。

`Text` は全文字列を **budoux** (`jaModel`) に通し、日本語の文節境界に `<wbr>` を入れる。`Code` はビルド時に highlight.js でハイライトして `dangerouslySetInnerHTML` で挿す (言語指定なしは `bash` にフォールバック)。画像・動画の `url` には `IMAGE_PATH` / `VIDEO_PATH` が前置される — アセットは `public/` ではなく別ホストから配信される。

## ビルド時に生成される非HTML

いずれも `next build` の中で出る。`HOST_URL` が空だとビルドが落ちる。

| 出力              | ソース                  | 備考                                                                                                                  |
| ----------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `out/sitemap.xml` | `app/sitemap.ts`        | `getPostPaths` から組み立てる (`out/` のファイル名は見ない)。一覧のページと記事のみで `/tags/*` `/month/*` は載せない |
| `out/robots.txt`  | `app/robots.ts`         | 全許可 + サイトマップの位置                                                                                           |
| `out/feed.xml`    | `app/feed.xml/route.ts` | RSS 2.0。RSS は Next の規約ルートに無いので Route Handler を自前で書いている                                          |

RSS の `description` は `getPostExcerpt` によるプレーンテキストの抜粋 (200字)。mdast を歩くが**コードブロック・画像・生HTMLは飛ばす**ため、本文がコードブロックだけの記事は抜粋が空になり、その場合は `<description>` 要素ごと省く。`app/layout.tsx` の `<head>` から `rel="alternate"` で発見させている。

## 一覧のページング

`lib/getPostsByPage.ts` で10件ずつ (`POSTS_PER_PAGE`)。**1ページ目は `/` が担当し、`app/page/[page]/page.tsx` は 2 以降だけを生成する** — 既存URLを壊さないためで、`/page/1` は存在しない。ページ番号からURLを引くのは `getPageHref` の一箇所だけなので、URL形式を変えるならそこを直す。

タグ別・月別はページングしていない (タグ最大5件、月別最大3件で不要なため)。

## タイムゾーン

記事の日付は JST 前提だが、`date-fns` の `format` は**実行環境のローカルタイムゾーン**で描画する。`Header` の表示時刻と `getPostMonths` / `getPostsByMonth` の月別集計が両方これに依存するため、UTC のマシンで組むと9時間ずれる。CI は `deploy.yml` の build ジョブに `TZ: Asia/Tokyo` を置いて揃えている。JST 以外の環境で作業するときは同じ指定が要る。

## 静的エクスポートの落とし穴

`app/sitemap.ts` / `app/robots.ts` / `app/feed.xml/route.ts` には **`export const dynamic = 'force-static'` が必須**。これらは `page.tsx` ではなく Route Handler にコンパイルされ、`output: 'export'` は force-static も revalidate も宣言されていない Route Handler をエクスポート不能と判断してビルドを止める。「静的エクスポートなんだから不要だろう」と外すと `Failed to collect page data` で落ちる。

`app/tags/[tag]/page.tsx` はタグのパラメータを条件付きでエンコードしている: `PHASE_PRODUCTION_BUILD` 中はそのまま、それ以外は `encodeURIComponent`。タグは日本語で `+` やスペースを含み、dev とエクスポートでエンコードの扱いが食い違う。`npm run dev` と生成された `out/tags/*.html` の両方を確認せずにこの分岐を「単純化」しないこと。

## スタイリング

コンポーネントごとの CSS Modules (`styles.module.css`)。**`typed-css-modules` が生成した `.module.css.d.ts` をコミットしている**が、スクリプトもウォッチャーも無いので `.module.css` を編集したら `npx tcm lib app` で型を再生成すること。グローバルは `lib/global.css` (`app/layout.tsx` から import)。tcm は CSS Modules でない `global.css` にも空の `.d.ts` を吐くが不要なので gitignore してある。

`lib/global.css` が `:root` に `--font` / `--fg` / `--fg-weak` / `--bg` / `--rule` を定義しており、各コンポーネントはこれを参照する。**`--font` で等幅を明示指定している** — 以前は `font-family` 未指定で読者のブラウザ既定に見た目が左右されていた。

`next/link` と `next/image` はどこでも使わず、素の `<a>` と `<img>` で統一している (画像は別ホスト配信のため)。対応する ESLint ルールは `eslint.config.mjs` で off にしてある。

## 規約

Prettier: インデント4スペース、セミコロンなし、シングルクォート、80桁、`arrowParens: "avoid"` (JSON/YAML は2スペース)。`lib/` からの import は `@lib/*` エイリアス — ただし `lib/get*.ts` は兄弟を相対パスで import している。編集対象のファイルの書き方に合わせること。

## デプロイ

`.github/workflows/deploy.yml` が `master` への push で動く: blog をクローン → lint → test → `npm run build` → artifact 経由で deploy ジョブへ → Tailscale → `rsync --delete` で `out/` を SSH 転送。**完全なミラーなので `out/` に無いものはサーバーから消える**。build と deploy の両ジョブに `test -f` の verify ステップがあり、成果物が欠けたら止まる。
