import renderer from 'react-test-renderer'
import { App } from '../../components/App'

describe('App.tsx', () => {
    it('is a root container for garypippi.net', () => {
        expect(renderer.create(<App><div>hoge</div></App>)).toMatchSnapshot()
    })
})
