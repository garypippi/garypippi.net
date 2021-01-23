import renderer from 'react-test-renderer'
import { AppHeader } from '../../components/AppHeader'

describe('AppHeader.tsx', () => {
    it('should render', () => {
        expect(renderer.create(<AppHeader />)).toMatchSnapshot()
    })
})
