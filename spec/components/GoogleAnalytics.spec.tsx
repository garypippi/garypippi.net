import * as NextRouter from 'next/router'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { mkcontainer } from '../mkcontainer'
import * as GoogleAnalytics from '../../components/GoogleAnalytics'

// makes test component to call useEffect inside react component
const mkcomponent = (gtag?: GoogleAnalytics.GtagFn) => {
    return () => {
        GoogleAnalytics.useGtag(gtag)
        return <div />
    }
}

describe('GoogleAnalytics.tsx', () => {
    describe('component', () => {
        // make sure to remove root element after each test
        afterEach(() => {
            document.body.removeChild(document.body.children[0])
        })
        it('should not render when gid is not provided', () => {
            const container = mkcontainer()
            render(<GoogleAnalytics.GoogleAnalytics />, container)
            expect(container.innerHTML).toBeFalsy()
        })
        it('should render when gid is provided', () => {
            const container = mkcontainer()
            render(<GoogleAnalytics.GoogleAnalytics id="hoge" />, container)
            expect(container.innerHTML).toMatchSnapshot()
        })
    })
    describe('createOnRouteChangeComplete', () => {
        it('should run gtag', () => {
            const gtag: GoogleAnalytics.GtagFn = jest.fn()
            GoogleAnalytics.createOnRouteChangeComplete('hoge', gtag)('fuga')
            expect(gtag).toHaveBeenCalledWith('config', 'hoge', {
                page_path: 'fuga',
            })
        })
    })
    describe('useGtag', () => {
        // make sure it does not query for gid
        it('should abort when gtag is not provided', () => {
            const spyQuerySelector = jest.spyOn(document, 'querySelector')
            GoogleAnalytics.useGtag()
            expect(spyQuerySelector).not.toHaveBeenCalled()
        })
        // make sure it queries for gid but abort after that
        it('should abort when gid is not provided', () => {
            const spyQuerySelector = jest.spyOn(document, 'querySelector')
            const spyUseRouter = jest.spyOn(NextRouter, 'useRouter')
            const spyCreateOnRouteChangeComplete = jest.spyOn(
                GoogleAnalytics,
                'createOnRouteChangeComplete',
            )
            GoogleAnalytics.useGtag(jest.fn())
            expect(spyQuerySelector).toHaveBeenCalledWith(
                `script.${GoogleAnalytics.idMarker}`,
            )
            expect(spyUseRouter).not.toHaveBeenCalled()
            expect(spyCreateOnRouteChangeComplete).not.toHaveBeenCalled()
        })
        describe('useEffect', () => {
            // make sure to remove root element after each test
            afterEach(() => {
                document.body.removeChild(document.body.children[0])
            })
            it('should use effect', () => {
                const container = mkcontainer()
                const on = jest.fn(),
                    off = jest.fn()
                const router = { events: { on, off } } as any
                jest.spyOn(NextRouter, 'useRouter').mockImplementation(
                    () => router,
                )
                document.head.innerHTML = `<script class="${GoogleAnalytics.idMarker}">hoge</script>`

                const Component = mkcomponent(jest.fn())

                // mount component
                // make sure it registers route event
                act(() => {
                    render(<Component />, container)
                })

                expect(on).toHaveBeenCalledWith(
                    GoogleAnalytics.routeEvent,
                    expect.any(Function),
                )

                // unmount component
                // make sure it registers route event by executing clean up code
                act(() => {
                    unmountComponentAtNode(container)
                })

                expect(off).toHaveBeenCalledWith(
                    GoogleAnalytics.routeEvent,
                    expect.any(Function),
                )
            })
        })
    })
})
