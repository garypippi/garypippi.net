export interface Post {
    attr: PostAttr
    body: string
}
export interface PostAttr {
    title: string
    date: string
    tags: string[]
}
