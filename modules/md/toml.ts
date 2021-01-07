import { parse } from 'toml'

export const toml = (input: string): any => {
    const attrs = parse(input)
    if (attrs.date instanceof Date) {
        attrs.date = attrs.date.toISOString()
    }

    return attrs
}
