import { parse } from 'toml'
import { DateTime } from 'luxon'

export const toml = (input: string): any => {
    const attrs = parse(input)
    if (attrs.date instanceof Date) {
        attrs.date = DateTime.fromJSDate(attrs.date).toFormat('yyyy/LL/dd HH:mm')
    }

    return attrs
}
