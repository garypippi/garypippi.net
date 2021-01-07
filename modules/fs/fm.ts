export const fm: (str: string) => string[] = str => {
    return (/^\+{3}\s([^]*?(?!\+{3}))\s\+{3}\s([^]*)$/.exec(str) || []).slice(1)
}
