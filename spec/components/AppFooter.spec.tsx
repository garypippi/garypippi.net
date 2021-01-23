import renderer from 'react-test-renderer'
import { AppFooter } from '../../components/AppFooter'
import { Link } from '../../modules/sns'


describe('AppFooter.tsx', () => {
    it('should render', () => {
        const links: Link[] = [
            {link: 'hoge', icon: 'fuga'},
            {link: 'fuga', icon: 'hoge'}
        ]
        expect(renderer.create(<AppFooter links={links} />)).toMatchSnapshot()
    })
})
