import renderer from 'react-test-renderer'
import * as GoogleAnalytics from '../../components/GoogleAnalytics'

describe('GoogleAnalytics.tsx', () => {
    describe('component', () => {
        it('should not render', () => {
            expect(renderer.create(<GoogleAnalytics.GoogleAnalytics />).toJSON()).toBe(null)
        })
        it('should render', () => {
            expect(renderer.create(<GoogleAnalytics.GoogleAnalytics id="hoge" />)).toMatchSnapshot()
        })
    })
    describe('createOnRouteChangeComplete', () => {
        it('should abort', () => {
            expect(GoogleAnalytics.createOnRouteChangeComplete()).toBeFalsy()
        })
        it('should abort further', () => {
            const gtagFn = jest.fn()
            const cb = GoogleAnalytics.createOnRouteChangeComplete(gtagFn)
            expect(cb).toBeTruthy()
            if (cb) {
                cb('hoge')
            }
            expect(gtagFn).not.toHaveBeenCalled()
        })
        it('should run further', () => {
            const gtagFn = jest.fn()
            const cb = GoogleAnalytics.createOnRouteChangeComplete(gtagFn)
            document.head.innerHTML = `<script class="${GoogleAnalytics.idMarker}">hoge</script>`
            expect(cb).toBeTruthy()
            if (cb) {
                cb('fuga')
            }
            expect(gtagFn).toHaveBeenCalledWith('config', 'hoge', {
                page_path: 'fuga'
            })
        })
    })
    describe('useGtag', () => {
        const createRouter = (on?: Function , off?: Function): any => ({
            events: {
                on: on || jest.fn(),
                off: off || jest.fn()
            }
        })
        it('should abort', () => {
            expect(GoogleAnalytics.useGtag(createRouter())).toBeFalsy()
        })
        it('should run', () => {
            const on = jest.fn((_, cb) => cb())
            const off = jest.fn((_, cb) => cb())
            const onRouteChangeComplete = jest.fn()
            const onEffect = GoogleAnalytics.useGtag(createRouter(on, off), onRouteChangeComplete)
            expect(onEffect).toBeTruthy()
            if (onEffect) {
                onEffect()()
                expect(on).toHaveBeenCalledWith(GoogleAnalytics.routeEvent, onRouteChangeComplete)
                expect(off).toHaveBeenCalledWith(GoogleAnalytics.routeEvent, onRouteChangeComplete)
                expect(onRouteChangeComplete).toHaveBeenCalledTimes(2)
            }
        })
    })
})
