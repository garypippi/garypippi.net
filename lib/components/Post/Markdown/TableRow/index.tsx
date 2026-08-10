import { Table as MdastTable, TableRow as MdastTableRow } from 'mdast'
import { TableCell } from '../TableCell'

type Props = {
    node: MdastTableRow
    align: MdastTable['align']
    head?: boolean
}

export const TableRow = ({ node, align, head }: Props) => {
    return (
        <tr>
            {node.children.map((node, i) => (
                <TableCell key={i} node={node} align={align?.[i]} head={head} />
            ))}
        </tr>
    )
}
