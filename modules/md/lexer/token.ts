import * as rules from './rules'

type T = 'root'|'nl'|'h'|'p'|'t'|'a'|'video'|'code'|'fence'|'img'|'ul'|'li'|'bullet'|'last'
type U = {type:T,content:string,matches:string[],tokens:U[],tokenizers:F[]}
type R = U|null
type C = RegExpExecArray|null
type F = (s: string) => R
export type Token = U
export type Tokenizer = F

const f = (c: C, t: T, u: U[] = [], f: F[] = []) => c && ({ type: t, content: c[0], matches: c.slice(1), tokens: u, tokenizers: f })
const g = (t: R, u: U[]) => u.length - (t ? u.push(t) : u.length)

export const tick = (t: U[], k: F[], s: string): U[] => {
    return s.length > 0 && k.length > 0
        ? tick(t, k, k.reduce((s, p) => g(p(s), t) ? s.substring(t[t.length-1].content.length) : s, s))
        : t
}

const ul: F = s => {
    return f(rules.ul.exec(s), 'ul', [], [
        s => f(rules.li.exec(s), 'li', [], [
            s => f(rules.nl.exec(s), 'nl'),
            s => f(rules.p.exec(s), 'p', [], [
                s => f(rules.bullet.exec(s), 'bullet'),
                s => f(rules.h.exec(s), 'h'),
                s => f(rules.code.exec(s), 'code'),
                s => f(rules.img.exec(s), 'img'),
                s => f(rules.video.exec(s), 'video'),
                s => f(rules.a.exec(s), 'a'),
                s => f(rules.t.exec(s), 't')
            ]),
            s => f(rules.nl.exec(s), 'nl'),
            ul
        ])
    ])
}

export const root: F = s => f(/[^]*/.exec(s), 'root', [], [
    s => f(rules.nl.exec(s), 'nl'),
    s => f(rules.fence.exec(s), 'fence'),//, [], [
    ul,
    s => f(rules.h.exec(s), 'h'),
    s => f(rules.p.exec(s), 'p', [], [
        s => f(rules.code.exec(s), 'code'),
        s => f(rules.img.exec(s), 'img'),
        s => f(rules.video.exec(s), 'video'),
        s => f(rules.a.exec(s), 'a'),
        s => f(rules.t.exec(s), 't'),
        s => f(/[^]*/.exec(s), 'last')
    ])
])
export const task: F[][] = [[
    s => f(rules.nl.exec(s), 'nl'),
    s => f(rules.fence.exec(s), 'fence'),
    s => f(rules.h.exec(s), 'h'),
    s => f(rules.ul.exec(s), 'ul'),
    s => f(rules.p.exec(s), 'p')
], [
    s => f(rules.code.exec(s), 'code'),
    s => f(rules.img.exec(s), 'img'),
    s => f(rules.video.exec(s), 'video'),
    s => f(rules.a.exec(s), 'a'),
    s => f(rules.t.exec(s), 't')
]]
