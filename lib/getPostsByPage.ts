import { getPosts } from './getPosts'

/**
 * 1ページあたりの記事数
 */
export const POSTS_PER_PAGE = 10

/**
 * ページ番号からURLを引く。1ページ目は既存URLを壊さないよう `/` のまま
 */
export const getPageHref = (page: number) =>
    page === 1 ? '/' : `/page/${page}`

/**
 * 総ページ数。記事が無くても1ページはある扱いにする
 */
export const getPageCount = async () =>
    getPosts().then(posts =>
        Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE)),
    )

/**
 * ページ番号 (1始まり) の記事一覧。getPosts が新しい順なのでそのまま切り出す
 */
export const getPostsByPage = async (page: number) =>
    getPosts().then(posts =>
        posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
    )
