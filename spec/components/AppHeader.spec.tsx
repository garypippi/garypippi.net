jest.mock('next/head', () => (props: any) => <div>{props.children}</div>)

import { render } from 'react-dom'
import { mkcontainer } from '../mkcontainer'
import { AppHeader } from '../../components/AppHeader'

describe('AppHeader.tsx', () => {
    it('should render', () => {
        const container = mkcontainer()
        render(<AppHeader title="hoge">fuga</AppHeader>, container)
        expect(container.innerHTML).toMatchSnapshot()
    })
})
