# CLAUDE.md

静的エクスポート (`output: 'export'`) された Next.js App Router のブログ。**記事コンテンツは別リポジトリにあり、このリポジトリはレンダラーのみ**。`BLOG_PATH` がそのチェックアウトを指す (CI ではビルド前に `./blog` へ `--depth 1` でクローン)。

## コマンド

```bash
npm run dev          # next dev (.env.local に BLOG_PATH が必要)
npm run build        # -> ./out (BLOG_PATH と HOST_URL が必要)
npm run lint         # eslint . (flat config: eslint.config.mjs)
npm test             # jest (spec/ 配下、Markdown まわりのみ)
npm run test:cli     # cli/ のテスト (tsc -p cli してから node:test)
npm run build:cli    # tsc -p cli -> cli/dist/index.mjs
npx tcm lib app      # CSS Modules の型を再生成 (後述、必須)
npx stylelint "lib/**/*.css" "app/**/*.css"   # スクリプトなし
```

テストは `spec/` に置く (ts-jest、`testEnvironment: node`)。**カバーしているのは Markdown のパースとレンダリングだけ**で、データ層 (`getPost*`) やページのルートにはテストがない。コンポーネントは `renderToStaticMarkup` の出力を検証する。CI のデプロイゲートが `npm run test` を実行するので、落ちるとデプロイされない。

- mdast / micromark / smol-toml は **ESM 専用**。依存を足して `Unexpected token 'export'` が出たら、そのパッケージを `jest.config.ts` の `esmPackages` に追加する。
- `spec/setupEnv.ts` が `IMAGE_PATH` / `VIDEO_PATH` を入れる。`lib/environments.ts` が読み込み時に `process.env` を評価するので、テスト対象の import より前に置く必要がある。

stylelint に `**/*.css` を渡すと `out/_next` の圧縮 CSS まで拾って大量に誤検出する。上記のようにソースだけを指定する。

## CLI

`cli/` は blog リポジトリの記事を扱う CLI (citty)。サブコマンドは `--help` で見られる。`tsc -p cli` で `cli/dist/` へ吐く (gitignore)。`BLOG_PATH` / `ASSETS_PATH` は `process.env` → リポジトリ root の `.env.local` の順で解決し、`--blog` / `--assets` で上書きできる。

- **`publish` は現在時刻を一度だけ取得**し、日時ディレクトリ名とフロントマターの `date` の両方に使う。`date-fns` の `format` はローカルタイムゾーン依存なので `TZ=Asia/Tokyo` を付けること。
- **smol-toml の日付 (`TomlDate`) を `String()` すると TOML として不正になる。** 書き戻しは `cli/blog.mts` の `formatDate` / `serialize` を通すこと。`serialize` は本文を一切加工しない。
- `lint` のアセット実在検査は `--assets` か `ASSETS_PATH` があるときだけ。無ければ検査だけ飛ばす。
- `cli/markdown.mts` の `SUPPORTED_NODE_TYPES` は **`lib/components/Post/index.tsx` の switch と対になっている**。向こうに `case` を足したらこちらにも足すこと。

テストは jest ではなく **`node:test`** で、コンパイル済みの `cli/dist` を検証する。**CI には入れていない。**

## 環境変数

レンダラー側はすべて `lib/environments.ts` 経由 (`ASSETS_PATH` は CLI 専用)。`.env` にキーの一覧、実値は `.env.local` (gitignore)。**CI は `.env.local` を作らず、GitHub Actions の変数を job の `env:` に直接置いている**。サーバーサイドは `BLOG_PATH` と `HOST_URL` のみ、残りは `NEXT_PUBLIC_*` としてクライアントバンドルに展開される。

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
- `attr.date` は型宣言では `string` だが、実際には `TomlDate` (Date のサブクラス) が入る。
- 各関数は毎回**全記事**を読み直してパースし直す。キャッシュはない。
- `attr.draft` は型に存在するが、これでフィルタしている箇所はない。

## Markdown のレンダリング

`getMdast` は `mdast-util-from-markdown` でパースするだけの同期関数。unified / remark は使わない。GFM はテーブルのみ有効で、取り消し線・脚注・autolink literal などは**入れていない**。

`lib/components/Post/index.tsx` は `node.type` の再帰的な switch で `Post/Markdown/*` へディスパッチし、**未対応の型では例外を投げる** (握り潰さない)。**`strong` / `emphasis` は未対応なので、記事で `**太字**` を使うとビルドが落ちる**。記法を足すにはコンポーネントを作り、`Post/Markdown/index.ts` から再エクスポートし、`case` を追加する。`tableRow` / `tableCell` は switch を通らず `Table` が直接描く。

動画は**画像記法**で書く。`image` ノードの `url` が `.mp4` / `.webm` / `.mov` (大文字可) で終われば `<video>`、それ以外は `<img>` (`isVideoUrl`)。画像・動画の `url` には `IMAGE_PATH` / `VIDEO_PATH` が前置される — アセットは `public/` ではなく別ホストから配信される。

`Text` は全文字列を **budoux** に通し、日本語の文節境界に `<wbr>` を入れる。`Code` はビルド時に highlight.js でハイライトする (言語指定なしは `bash`)。

## ビルド時に生成される非HTML

`app/sitemap.ts` / `app/robots.ts` / `app/feed.xml/route.ts` が `next build` の中で `out/` に出す。`HOST_URL` が空だとビルドが落ちる。サイトマップは一覧のページと記事のみで `/tags/*` `/month/*` は載せない。

## 一覧のページング

`lib/getPostsByPage.ts` で10件ずつ。**1ページ目は `/` が担当し、`app/page/[page]/page.tsx` は 2 以降だけを生成する** — 既存URLを壊さないためで、`/page/1` は存在しない。ページ番号からURLを引くのは `getPageHref` の一箇所だけ。タグ別・月別はページングしていない。

## タイムゾーン

記事の日付は JST 前提だが、`date-fns` の `format` は**実行環境のローカルタイムゾーン**で描画する。`Header` の表示時刻と月別集計が両方これに依存するため、UTC のマシンで組むと9時間ずれる。CI は build ジョブに `TZ: Asia/Tokyo` を置いて揃えている。JST 以外の環境で作業するときは同じ指定が要る。

## 静的エクスポートの落とし穴

`app/sitemap.ts` / `app/robots.ts` / `app/feed.xml/route.ts` には **`export const dynamic = 'force-static'` が必須**。外すと `Failed to collect page data` で落ちる。

`app/tags/[tag]/page.tsx` はタグのパラメータを条件付きでエンコードしている: `PHASE_PRODUCTION_BUILD` 中はそのまま、それ以外は `encodeURIComponent`。タグは日本語で `+` やスペースを含み、dev とエクスポートでエンコードの扱いが食い違う。`npm run dev` と生成された `out/tags/*.html` の両方を確認せずにこの分岐を「単純化」しないこと。

## スタイリング

コンポーネントごとの CSS Modules (`styles.module.css`)。**`typed-css-modules` が生成した `.module.css.d.ts` をコミットしている**が、スクリプトもウォッチャーも無いので `.module.css` を編集したら `npx tcm lib app` で型を再生成すること。グローバルは `lib/global.css` で、`:root` の `--font` / `--fg` / `--fg-weak` / `--bg` / `--rule` を各コンポーネントが参照する。

`next/link` と `next/image` は使わず、素の `<a>` と `<img>` で統一している。

## 規約

Prettier: インデント4スペース、セミコロンなし、シングルクォート、80桁、`arrowParens: "avoid"` (JSON/YAML は2スペース)。`lib/` からの import は `@lib/*` エイリアス — ただし `lib/get*.ts` は兄弟を相対パスで import している。編集対象のファイルの書き方に合わせること。

## デプロイ

`master` への push で lint → test → build → デプロイ。**`rsync --delete` の完全なミラーなので `out/` に無いものはサーバーから消える**。
