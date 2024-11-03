import { render } from 'react-dom'
import { mkcontainer } from '../mkcontainer'
import { AppFooter } from '../../components/AppFooter'
import * as Store from '../../modules/store'

const snsLinks = [
    { href: 'hoge', icon: 'fuga' },
    { href: 'fuga', icon: 'hoge' },
]

describe('AppFooter.tsx', () => {
    it('should render', () => {
        const container = mkcontainer()
        const spy = jest.spyOn(Store, 'useSnsLinks')
        spy.mockImplementation(() => snsLinks)
        render(<AppFooter />, container)
        expect(container.innerHTML).toMatchSnapshot()
    })
})
