import { getPostMonths } from './getPostMonths'

export type MonthItem = {
    /** 表示用の月 (`08`) */
    label: string
    /** `/month/2026-08` */
    href: string
    count: number
}

export type YearGroup = {
    year: string
    months: MonthItem[]
}

/**
 * 月別一覧を年ごとにまとめる。`yyyy-MM` のキーは辞書順が日付順と一致するので
 * 文字列比較で新しい順に並べられる
 */
export const getPostMonthsByYear = async (): Promise<YearGroup[]> => {
    const months = await getPostMonths()
    const groups = new Map<string, MonthItem[]>()

    for (const month of Object.keys(months).sort().reverse()) {
        const [year, mm] = month.split('-')
        const items = groups.get(year) ?? []
        items.push({
            label: mm,
            href: `/month/${month}`,
            count: months[month],
        })
        groups.set(year, items)
    }

    // tsconfig の target が ES5 なので Map の spread は使えない
    return Array.from(groups).map(([year, items]) => ({
        year,
        // 年の中は古い順に並べたほうが番号として読みやすい
        months: items.reverse(),
    }))
}
