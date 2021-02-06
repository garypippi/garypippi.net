import { render } from 'react-dom'
import { mkcontainer } from '../mkcontainer'
import { AppPage } from '../../components/AppPage'

describe('AppPage.tsx', () => {
    it('should render md', () => {
        const container = mkcontainer()
        render(<AppPage size="md">hoge</AppPage>, container)
        expect(container.innerHTML).toMatchSnapshot()
    })
    it('should render lg', () => {
        const container = mkcontainer()
        render(<AppPage size="lg">hoge</AppPage>, container)
        expect(container.innerHTML).toMatchSnapshot()
    })
})
