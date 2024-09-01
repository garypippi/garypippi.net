import { Text } from 'mdast'
import { Fragment } from 'react'
import { loadDefaultJapaneseParser } from 'budoux'

const wbrParser = loadDefaultJapaneseParser()

interface Props {
    node: Text
}

export const AppMarkdownText = ({ node: { value } }: Props) => {
    return (
        <>
            {value.split('\n').map((text, i) => (
                <Fragment key={`text-${i}`}>
                    {i !== 0 && <br />}
                    {wbrParser.parse(text).map((fgmt, j) => (
                        <Fragment key={`fgmt-${j}`}>
                            {j !== 0 && <wbr />}
                            {fgmt}
                        </Fragment>
                    ))}
                </Fragment>
            ))}
        </>
    )
}
