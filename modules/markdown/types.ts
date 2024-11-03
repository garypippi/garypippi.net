import { Node } from 'unist'
import { Resource, Alternative } from 'mdast'

export interface Video extends Node, Resource, Alternative {
    type: 'video'
}

export interface Attribute {
    title: string
    date: string
    tags: string[]
}

export interface Entry {
    href: string
    attr: Attribute
    body: string
}
