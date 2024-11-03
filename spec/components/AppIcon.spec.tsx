import { render } from 'react-dom'
import { mkcontainer } from '../mkcontainer'
import { AppIcon } from '../../components/AppIcon'

describe('AppIcon.tsx', () => {
    it('should render', () => {
        const container = mkcontainer()
        render(
            <AppIcon size={123} className="hoge">
                fuga
            </AppIcon>,
            container,
        )
        expect(container.innerHTML).toMatchSnapshot()
    })
})
