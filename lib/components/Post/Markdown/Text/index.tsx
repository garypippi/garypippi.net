import { Text as MdastText } from 'mdast'
import { Fragment } from 'react'
import { jaModel, Parser } from 'budoux'

const wbrParser = new Parser(jaModel)

type Props = {
    node: MdastText
}

export const Text = ({ node: { value } }: Props) => {
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
