import { join } from 'path'
import { existsSync, readdirSync, createWriteStream } from 'fs'

const outDir = join(process.cwd(), 'out')
const ignore = [/^_next$/, /^404\.html/, /^tags$/, /^sitemap\.xml$/, /^index\.html$/]
const output = join(outDir, 'sitemap.xml')

const hostURL = process.env.HOST_URL

export const sitemap = () => {
    if (!hostURL) {
        throw new Error('Please provide HOST_URL environment variable')
    }
    if (!existsSync(outDir)) {
        throw new Error(`Directory ${outDir} does not exist.`)
    }

    const handle = createWriteStream(output, {
        encoding: 'utf8',
    })

    handle.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    handle.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

    handle.write('<url>\n')
    handle.write(`  <loc>${hostURL}/</loc>\n`)
    handle.write('</url>\n')

    readdirSync(outDir)
        .filter(file => !ignore.some(re => re.test(file)))
        .forEach(file => {
            handle.write('<url>\n')
            handle.write(`  <loc>${hostURL}/${file.replace(/^([^.]+)\.html$/, '$1')}</loc>\n`)
            handle.write('</url>\n')
        })

    handle.write('</urlset>')
    handle.close()
}
