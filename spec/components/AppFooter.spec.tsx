import renderer from 'react-test-renderer'
import { AppFooter } from '../../components/AppFooter'
import * as Store from '../../modules/store'


describe('AppFooter.tsx', () => {
    const snsLinks = [
        { href: 'hoge', icon: 'fuga' },
        { href: 'fuga', icon: 'hoge' }
    ]
    it('should render', () => {
        const spy = jest.spyOn(Store, 'useSnsLinks')
        spy.mockImplementation(() => snsLinks)
        expect(renderer.create(<AppFooter />)).toMatchSnapshot()
    })
})
