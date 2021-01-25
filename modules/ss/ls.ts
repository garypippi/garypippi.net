import { join, basename } from 'path'
import * as fs from 'fs'
import { promisify } from 'util'
import { ls } from '../fs/ls'
import { fm } from '../fs/fm'
import { toml } from '../md/toml'
import { PostAttr } from '../../types'

const read = promisify(fs.readFile)

export type Prop = (PostAttr&{href:string})[]

export const getStaticProps = async (): Promise<Prop> => {
    return ls(join(process.cwd(), 'blog')).then(async paths => {
        return Promise.all(
            paths.map(async path => {
                return read(path).then(buffer => ({
                    href: `/${basename(path).slice(0, -3)}`,
                    ...toml(fm(buffer.toString())[0])
                }))
            })
        )
    })
}
