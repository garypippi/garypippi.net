import { code } from './code'
import { a } from './a'
import { nl } from './nl'

const r = [code, a, nl]

export const t = new RegExp(
    `^(?:[^](?!(?:${r.map(r => r.source.substring(1)).join('|')})))+[^n]`
)
