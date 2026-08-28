// lib/environments.ts は読み込み時に process.env を評価するので、
// テスト対象の import より前に値を入れておく必要がある
// これらは記事中の url にそのまま前置されるだけで区切りの `/` は補われない。
// 実際の値も末尾スラッシュ込みで設定する必要がある
process.env.NEXT_PUBLIC_IMAGE_PATH = 'https://img.example.com/'
process.env.NEXT_PUBLIC_VIDEO_PATH = 'https://video.example.com/'
