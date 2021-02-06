import { render } from 'react-dom'
import { mkcontainer } from '../mkcontainer'
import { App } from '../../components/App'

describe('App.tsx', () => {
    it('is a root container for garypippi.net', () => {
        const container = mkcontainer()
        render(<App>hoge</App>, container)
        expect(container.innerHTML).toMatchSnapshot()
    })
})
