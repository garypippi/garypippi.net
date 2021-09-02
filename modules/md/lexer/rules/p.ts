import { nl } from './nl'
import { fence } from './fence'
import { ul } from './ul'
import { h } from './h'

const r = [nl, fence, ul, h]

export const p = new RegExp(
    `^(?:[^\n]+(?:\n(?!(?:${r.map(r => r.source.slice(1)).join('|')})))*)+`
)

console.log(
    new RegExp(
        `^(?:[^\n]+\n(?!${ul.source.slice(1)}))+`
    ).exec(
        `- 5557コンタクト
    - nest test
    - nest test
    - nest test
        - nest test
        - nest test
        - nest test
`
    )
)
