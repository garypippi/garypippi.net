import { Text } from 'mdast'
import { Fragment } from 'react'

interface Props {
    node: Text
}

export const AppMarkdownText = ({ node }: Props) => {

    const texts = node.value.split('\n')

    return (
        <>
            {texts.map((text, i) => (
                <Fragment key={i}>
                    {text}
                    {i !== texts.length - 1 && <br />}
                </Fragment>
            ))}
        </>
    )
}
