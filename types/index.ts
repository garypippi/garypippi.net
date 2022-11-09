export interface Post {
    attr: PostAttr
    body: string
    rawBody: string
}
export interface PostAttr {
    title: string
    date: string
    tags: string[]
}
