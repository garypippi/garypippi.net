import renderer from 'react-test-renderer'
import { AppIcon } from '../../components/AppIcon'

describe('AppIcon.tsx', () => {
    it('should render', () => {
        const component = renderer.create(
            <AppIcon
                size={123}
                className="hoge"
            >
                fuga
            </AppIcon>
        )
        expect(component).toMatchSnapshot()
    })
})
